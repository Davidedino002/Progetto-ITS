import express from "express";
import ProdottiTabella from "../Schemi/ProdottiSchemi";
import { Prodotti } from "../Modelli/Prodotti";
import Acquisto from "../Modelli/Acquisto";

const apiRouter: express.Router = express.Router();
/*
Uso: Creiamo i prodotti
URL: http://localhost:5000/api/v1/prodotti
Metodo: POST
Proprietà: nome, immagine, prezzo, quantità, info
Accesso: Pubblico
*/
//LOGICA
apiRouter.post(
  "/prodotti",
  async (request: express.Request, response: express.Response) => {
    try {
      let prodotti = {
        nome: request.body.nome,
        immagine: request.body.immagine,
        prezzo: request.body.prezzo,
        quantity: request.body.quantity,
        info: request.body.info,
      };
      //controlla se il prodotto esiste già
      let existingProdotti = await ProdottiTabella.findOne({
        nome: prodotti.nome,
      });
      if (existingProdotti) {
        return response.status(401).json({
          msg: "Il prodotto Esiste!",
        });
      }
      //Creazione del Prodotto
      let newProdotti = new ProdottiTabella(prodotti);
      prodotti = await newProdotti.save(); //inserimento nel Database
      response.status(200).json(prodotti);
    } catch (error) {
      console.log(error);
      response.status(500).json({
        error: error,
      });
    }
  }
);

/*
Uso: Aggiorniamo i Prodotti
URL:http://localhost:5000/api/v1/prodotti/:prodottiId
Metodo: PUT
Proprietà: nome, immagine, prezzo, quantità, info
Accesso: Pubblico
*/
apiRouter.put(
  "/prodotti/:prodottiId",
  async (request: express.Request, response: express.Response) => {
    let { prodottiId } = request.params;
    try {
      let Updateprodotti = {
        nome: request.body.nome,
        immagine: request.body.immagine,
        prezzo: request.body.prezzo,
        quantity: request.body.quantity,
        info: request.body.info,
      };
      //controlla se il prodotto esiste già
      let prodotti: Prodotti | null = await ProdottiTabella.findById(
        prodottiId
      );
      if (!prodotti) {
        return response.status(404).json({
          msg: "Prodotto non Esiste",
        });
      }
      //Aggiornamento Prodotto
      prodotti = await ProdottiTabella.findByIdAndUpdate(
        prodottiId,
        {
          $set: {
            nome: Updateprodotti.nome ? Updateprodotti.nome : prodotti.nome,
            immagine: Updateprodotti.immagine
              ? Updateprodotti.immagine
              : prodotti.immagine,
            prezzo: Updateprodotti.prezzo
              ? Updateprodotti.prezzo
              : prodotti.prezzo,
            quantity: Updateprodotti.quantity
              ? Updateprodotti.quantity
              : prodotti.quantity,
            info: Updateprodotti.info ? Updateprodotti.info : prodotti.info,
          },
        },
        { new: true }
      );
      response.status(200).json(prodotti);
    } catch (error) {
      console.log(error);
      /*if(error && error.kind === "ObjectId"){
    return response.status(404).json({
        msg: "Prodotto non Esiste"
    });
}*/
      response.status(500).json({
        error: error,
      });
    }
  }
);
/*
Uso: Otteniamo Tutti i prodotti
URL:http://localhost:5000/api/v1/tuttiprodotti
Metodo: GET
Proprietà: nessuna proprietà
Accesso: Pubblico
*/
apiRouter.get(
  "/tuttiprodotti",
  async (request: express.Request, response: express.Response) => {
    try {
      let prodotti: Prodotti[] = await ProdottiTabella.find();
      response.status(200).json(prodotti);
    } catch (error) {}
  }
);
/*Uso: Otteniamo il singolo prodotto
     URL:http://localhost:5000/api/v1/prodotto/:prodottoId
     Metodo: GET
     Proprietà: Nessuna proprietà
     Accesso: Pubblico
    */
apiRouter.get(
  "/prodotto/:prodottoId",
  async (request: express.Request, response: express.Response) => {
    let { prodottoId } = request.params;
    try {
      let prodotti: Prodotti | null = await ProdottiTabella.findById(
        prodottoId
      );
      if (!prodotti) {
        return response.status(404).json({
          msg: "Prodotto non è stato trovato!",
        });
      }
      response.status(200).json(prodotti);
    } catch (error) {
      console.log(error);
      response.status(500).json({
        error: error,
      });
    }
  }
);

/*
Uso: Crea un nuovo documento di acquisto
URL: http://localhost:5000/api/v1/acquisti
Metodo: POST
Proprietà: frase
Accesso: Pubblico
*/
apiRouter.post(
  "/acquisti",
  async (req: express.Request, res: express.Response) => {
    try {
      const { frase } = req.body;
      const nuovoAcquisto = new Acquisto({ frase });
      await nuovoAcquisto.save();
      res
        .status(201)
        .json({
          msg: "Acquisto creato con successo!",
          acquisto: nuovoAcquisto,
        });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ msg: "Errore durante la creazione dell'acquisto", error });
    }
  }
);

/*Uso: Elimina Il prodotto
      URL:URL:http://localhost:5000/api/v1/prodotto/:prodottoId
      Metodo: Delete
      Proprietà: Nessuna Proprietà
      Accesso: Pubblico
    */
apiRouter.delete(
  "/prodotto/:prodottoId",
  async (request: express.Request, response: express.Response) => {
    let { prodottoId } = request.params;
    try {
      let prodotti: Prodotti | null = await ProdottiTabella.findById(
        prodottoId
      );
      if (!prodotti) {
        return response.status(404).json({
          msg: "Prodotto non è stato trovato!",
        });
      }
      //delete
      prodotti = await ProdottiTabella.findByIdAndDelete(prodottoId);
      response.status(200).json(prodotti);
    } catch (error) {
      console.log(error);
      response.status(500).json({
        error: error,
      });
    }
  }
);

export default apiRouter;
