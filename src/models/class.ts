import {Schema, SchemaTypes, Document}  from 'mongoose';
const normalize = require('normalize-mongoose');

export const classSchema: Schema = new Schema({
   name: String,
   description: String,
   fee: Number,
   courseId: {
      type: SchemaTypes.ObjectId,
      ref: 'course'
   },
   teacherId: {
      type: SchemaTypes.ObjectId,
      ref: 'teacher'
   }
});

export interface IClass extends Document {
   name: string,
   description: string,
   fee: number,
   courseId: string,
   teacherId: string
}

classSchema.plugin(normalize);