import {Schema, SchemaTypes, Document}  from 'mongoose';
const normalize = require('normalize-mongoose');

export const classSchema: Schema = new Schema({
   name: {type: String, require: true},
   description: String,
   fee: Number,
   course: {
      type: SchemaTypes.ObjectId,
      ref: 'course'
   },
   teacher: {
      type: SchemaTypes.ObjectId,
      ref: 'teacher'
   },
   sessions: {
      type: Object,
      ref: 'session'
   }
});

export interface IClass extends Document {
   name: string,
   description: string,
   fee: number,
   course: string,
   teacher: string
}

export interface AddClassRequest {
   name: string,
   description: string,
   fee: string,
}

classSchema.plugin(normalize);