import mongoose, { Schema } from "mongoose";

export interface UserSchema extends mongoose.Document {
  Nome: string;
  Cognome: string;
  Contatti: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const userSchemaFields: Record<string, any> = {
  Nome: { type: String, required: true },
  Cognome: { type: String, required: true },
  Contatti: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
};

const userSchema = new Schema<UserSchema>(userSchemaFields);

export const User = mongoose.model<UserSchema>('User', userSchema);