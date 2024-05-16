import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { Mongoose } from "mongoose";
import apiRouter from "./Rotte/api.rotte";
import bodyParser from "body-parser";
import { UserController } from "./Controller/UserController";
import WebSocket from "ws";
import http from "http";
import Acquisto from "./Modelli/Acquisto";

const app: express.Application = express();

//configurazione
app.use(cors()); //CORS
dotenv.config({ path: "./.env" }); //env.per le variabili
app.use(express.json()); //Dati per il file Json
app.use(bodyParser.json());

let hostName: string | undefined = process.env.HOST_NAME; //Chiamiamo dal file .env  HOST_NAME
let port: number | undefined = Number(process.env.PORT); //Chiamiamo dal file .env PORTA
let mongoDBURL: string | undefined = process.env.MONGODB_URL; //Chiamiamo dal file .env  MONGODB_URL

//MONGO_DB Connection
if (mongoDBURL) {
  mongoose
    .connect(mongoDBURL)
    .then((response: Mongoose) => {
      console.log(`Connessione Mongo DB riuscita!`);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1); //stop the node js
    });
}

// Rotta di benvenuto
app.get("/", (request: express.Request, response: express.Response) => {
  response.status(200).json({
    msg: "Benvenuto su Zimbo Server (in ExpressJs) per l'applicazione di e-commerce",
  });
});

//Configurazione del router
app.use("/api/v1", apiRouter);

// Rotte degli utenti
const userController = new UserController();

// Rotta per la registrazione di un nuovo utente
// http://localhost:5000/api/v1/register,
app.post("/api/v1/register", (req: Request, res: Response) => {
  userController.registerUser(req, res);
});

// Rotta per l'accesso di un utente
// http://localhost:5000/api/v1/login,
app.post("/api/v1/login", (req: Request, res: Response) => {
  userController.loginUser(req, res);
});

apiRouter.post(
  "/api/v1/acquisti",
  async (req: express.Request, res: express.Response) => {
    try {
      const { frase } = req.body;
      const nuovoAcquisto = new Acquisto({ frase }); // Crea un nuovo documento di acquisto
      await nuovoAcquisto.save(); // Salva il nuovo acquisto nel database
      res
        .status(201)
        .json({
          msg: "Prodotto acquistato e salvato nel database!",
          acquisto: nuovoAcquisto,
        });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          msg: "Errore durante il salvataggio dell'acquisto nel database",
          error,
        });
    }
  }
);

// Avvio del server Express
const server = http.createServer(app);

// Avvio del server WebSocket sulla stessa porta del server HTTP
const wss = new WebSocket.Server({ server });

// Gestione delle connessioni WebSocket
wss.on("connection", (ws) => {
  console.log("Nuova connessione WebSocket");

  // Esempio di gestione dei messaggi in arrivo
  ws.on("message", (message) => {
    console.log(`Messaggio ricevuto: ${message}`);
  });

  // Esempio di gestione degli errori
  ws.on("error", (error) => {
    console.error(`Errore WebSocket: ${error}`);
  });
});

// Avvio del server
const PORT: number = process.env.PORT ? Number(process.env.PORT) : 5000;
const HOST_NAME: string = process.env.HOST_NAME || "localhost";

if (port !== undefined && hostName !== undefined) {
  app.listen(port, hostName, () => {
    console.log(`Server Express run in: http://${hostName}:${port} `);
  });
}
