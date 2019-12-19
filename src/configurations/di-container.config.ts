import 'reflect-metadata';
import { Container } from 'inversify';
import { interfaces, TYPE } from 'inversify-restify-utils';

import { Services } from '../constants/types';
import { CategoryController } from '../controllers';
import { CategoryService } from '../services';

/** load everything needed to the Container */
export const getConfiguredDIContainer = () => {
  const container = new Container();

  // load controllers here
  container
    .bind<interfaces.Controller>(TYPE.Controller)
    .to(CategoryController)
    .inRequestScope()
    .whenTargetNamed('CategoryController');

  // load services here
  container
    .bind<CategoryService>(Services.CategoryService)
    .to(CategoryService)
    .inRequestScope();

  return container;
};
