import * as Joi from '@hapi/joi';

import { ICategory } from '../models';

export const validateUpdateCategory = (category: ICategory): Joi.ValidationResult => {
  const schema = Joi.object<ICategory>({
    name: Joi.string()
      .optional()
      .min(3)
  });

  return schema.validate(category);
};
