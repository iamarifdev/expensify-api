import { Schema, model } from 'mongoose';
import * as timestamp from 'mongoose-timestamp';

import { ICategory } from '../models';

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

CategorySchema.plugin(timestamp);

export const Category = model<ICategory>('Category', CategorySchema);
