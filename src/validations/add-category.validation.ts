import * as Joi from '@hapi/joi';

import { ICategory } from '../models';

export const validateAddCategory = (category: ICategory): Joi.ValidationResult => {
  const schema = Joi.object<ICategory>({
    name: Joi.string()
      .required()
      .min(3)
  });

  return schema.validate(category);
};
