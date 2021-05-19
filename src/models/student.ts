import mongoose, { Schema, Document } from "mongoose";
const normalize = require("normalize-mongoose");

export const studentSchema: Schema = new Schema({
  name: { type: String, require: true },
  phone: String,
  email: String,
  note: String,
});

export interface IStudent extends Document {
  name: string;
  phone: string;
  email: string;
  note: string;
}

export interface AddStudentRequest {
  name: string;
  phone: string;
  email: string;
  note: string;
}

studentSchema.plugin(normalize);
