import 'reflect-metadata';
import { expect } from 'chai';
import { CategoryController } from '.';
import { CategoryService } from '../services';

describe('Category Controller', () => {
  let controller: CategoryController;

  beforeEach(() => {
    controller = new CategoryController(new CategoryService());
  });

  it('should instantiate Category Controller', () => {
    expect(controller).to.be.instanceOf(CategoryController);
  });
});
