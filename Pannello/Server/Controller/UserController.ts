import { Request, Response } from "express";
import { User } from "../Schemi/User.Schema";
import jwt from "jsonwebtoken";

export class UserController {
  public registerUser(req: Request, res: Response): void {
    const { Nome, Cognome, Contatti, email, password, confirmPassword } =
      req.body;

    // Verifica se confirmPassword è presente nella richiesta
    if (!confirmPassword) {
      res.status(400).json({ msg: "Il campo confirmPassword è obbligatorio" });
    }

    // Verifica se le password coincidono
    if (password !== confirmPassword) {
      res.status(400).json({ msg: "Le password non corrispondono" });
    }

    // Crea un nuovo utente con i dati forniti
    const newUser = new User({
      Nome,
      Cognome,
      Contatti,
      email,
      password,
      confirmPassword,
    });

    // Salva il nuovo utente nel database
    newUser
      .save()
      .then((result) => {
        res
          .status(201)
          .json({ msg: "Nuovo utente creato con successo!", result });
      })
      .catch((error) => {
        res
          .status(500)
          .json({ msg: "Errore durante la creazione dell'utente", error });
      });
  }

  public loginUser(req: Request, res: Response): void {
    const { email, password } = req.body;

    User.findOne({ email })
      .then((result: any) => {
        // Usa any per il risultato se non hai definito un'interfaccia specifica per il documento mongoose
        if (result) {
          if (result.password === password) {
            const token = generateToken({ email, password });
            res
              .status(200)
              .send({ msg: "Login avvenuto con successo", result, token });
          } else {
            res
              .status(500)
              .send({ msg: "Perfavore Scrivi email e password validi " });
          }
        } else {
          res.status(500).send({ msg: "Perfavore Scrivi un email Valida" });
        }
      })
      .catch((error: any) => {
        res.status(500).json({ msg: "Errore durante il login", error });
      });
  }
}

function generateToken(payload: any): string {
  const privateKey = "token";
  return jwt.sign(payload, privateKey);
}
