import mongoose from "mongoose";

export interface UserSchema extends mongoose.Document {
  Nome: string;
  Cognome: string;
  Contatti: string;
  email: string;
  password: string;
  confirmPassword: string;
}
