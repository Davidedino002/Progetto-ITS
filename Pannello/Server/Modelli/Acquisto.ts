import mongoose, { Schema, Document } from "mongoose";

export interface Acquisto extends Document {
  frase: string;
}

const AcquistoSchema: Schema = new Schema({
  frase: { type: String, required: true },
});

export default mongoose.model<Acquisto>("Acquisto", AcquistoSchema);
