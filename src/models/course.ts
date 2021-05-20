import {Schema, Document} from 'mongoose';
import { IClass } from './class';
const normalize = require('normalize-mongoose');

export const courseSchema: Schema = new Schema({
   name: {type: String, require: true},
   description: String,
   tech: String,
   image: {
      type: String,
      default: 'https://via.placeholder.com/1200x500?text=Course+Image'
   },
});

export interface ICourse extends Document {
   name: string,
   description: string,
   tech: string,
   image: string,
}

export interface AddCourseRequest {
   name: string,
   description: string,
   tech: string,
   image: string,
}

courseSchema.plugin(normalize);