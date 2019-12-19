import 'reflect-metadata';
import { expect } from 'chai';
import { CategoryService } from './category.service';
import { Pagination, ICategory } from '../models';

describe('CategoryService', () => {
  let categoryService: CategoryService;

  beforeEach(() => {
    categoryService = new CategoryService();
  });

  it('should add a new category', async () => {
    const category = {
      name: 'Ariful Islam'
    } as ICategory;
    const createdCategory = await categoryService.addCategory(category);
    expect(createdCategory).not.to.be.null;
    expect(createdCategory._id).not.to.be.null;
  });

  it('should add a new category without balance', async () => {
    const category = {
      name: 'Shariful Islam'
    } as ICategory;
    const createdCategory = await categoryService.addCategory(category);
    expect(createdCategory).not.to.be.null;
    expect(createdCategory._id).not.to.be.null;
  });

  it('should get all category without pagination', async () => {
    const categorys = await categoryService.getAllPaginatedCategories({} as Pagination);
    expect(categorys).not.to.be.null;
  });

  it('should get all category with pagination', async () => {
    const categorys = await categoryService.getAllPaginatedCategories(
      new Pagination({
        page: 1,
        pageSize: 10
      })
    );
    expect(categorys).not.to.be.null;
  });

  it('should test simple async method', async () => {
    const valid = await categoryService.testPromise();
    expect(valid).to.be.equal(true);
  });
});
