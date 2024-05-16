import mongoose from "mongoose";
import { Prodotti } from "../Modelli/Prodotti";

const prodottiSchemi = new mongoose.Schema(
  {
    nome: { type: String, required: true, unique: true },
    immagine: { type: String, required: true },
    prezzo: { type: String, required: true },
    quantity: { type: String, required: true },
    info: { type: String, required: true },
  },
  { timestamps: true }
);

const ProdottiTabella: mongoose.Model<Prodotti> = mongoose.model<Prodotti>(
  "Prodotti",
  prodottiSchemi
);
export default ProdottiTabella;
