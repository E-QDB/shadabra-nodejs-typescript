import {Schema, Document} from 'mongoose';
import { IClass } from './class';
const normalize = require('normalize-mongoose');

export const courseSchema: Schema = new Schema({
   name: String,
   description: String,
   tech: String,
   image: {
      type: String,
      default: 'https://via.placeholder.com/1200x500?text=Course+Image'
   },
   classes: [{
      type: Object,
      ref: 'class',
      select: false
   }]
});

export interface ICourse extends Document {
   name: string,
   description: string,
   tech: string,
   image: string,
   classes: [IClass]
}

courseSchema.plugin(normalize);