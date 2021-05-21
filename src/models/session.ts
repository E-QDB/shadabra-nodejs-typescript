import mongoose, { Schema, Document, SchemaTypes } from "mongoose";
import { IClass } from "./class";
import { ITeacher } from "./teacher";
const normalize = require("normalize-mongoose");

export const sessionSchema: Schema = new Schema({
  name: String,
  class: {
    type: SchemaTypes.ObjectId,
    ref: "class",
  },
  teacher: {
    type: SchemaTypes.ObjectId,
    ref: "teacher",
  },
  startTime: String,
  endTime: String,
  date: Date,
});

export interface ISession extends Document {
  name: string;
  class: [IClass];
  teacher: [ITeacher];
  startTime: string;
  endTime: string;
  date: Date;
}

export interface AddSessionRequest {
  name: string;
  class: string;
  teacher: string;
  startTime: string;
  endTime: string;
  date: Date;
}

sessionSchema.plugin(normalize);
