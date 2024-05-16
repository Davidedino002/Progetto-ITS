import mongoose from "mongoose";

export interface Prodotti extends mongoose.Document {
  _id?: string;
  nome: string;
  immagine: string;
  prezzo: string;
  quantity: string;
  info: string;
  creato_prodotto?: string;
  aggiorna_prodotto?: string;
}
