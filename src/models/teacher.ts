import mongoose, {Schema, Document}  from 'mongoose';
import { IClass } from './class';
const normalize = require('normalize-mongoose');

export const teacherSchema: Schema = new Schema({
   name: String,
   phone: String,
   email: String,
   bio: String,
   isAdmin: {
      type: Boolean,
      default: false
   },
   avatar: {
      type: String,
      default: 'https://i.pravatar.cc/300'
   },
   classes: [{
      type: Object,
      ref: 'class',
   }]
});

export interface ITeacher extends Document {
   name: string,
   phone: string,
   email: string,
   bio: string,
   isAdmin: boolean,
   avatar: string,
   classes: [IClass]
}

teacherSchema.plugin(normalize);