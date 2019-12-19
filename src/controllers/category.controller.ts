import { Request } from 'restify';
import { NotFoundError, BadRequestError } from 'restify-errors';
import { injectable, inject } from 'inversify';
import { Controller, Get, Post, interfaces, Put, Delete } from 'inversify-restify-utils';

import { ICategory, Pagination } from '../models';
import { CategoryService } from '../services';
import { Services } from '../constants/types';
import { validateAddCategory, validateUpdateCategory } from '../validations';

@Controller('/api/category')
@injectable()
export class CategoryController implements interfaces.Controller {
  constructor(@inject(Services.CategoryService) private categoryService: CategoryService) {}

  /**
   * Get All category by pagination
   * @param req
   */
  @Get('/list')
  public async getAllPaginatedCategories(req: Request) {
    try {
      const params = new Pagination(req.query);
      const categorys = await this.categoryService.getAllPaginatedCategories(params);
      return categorys;
    } catch (error) {
      return new NotFoundError(error);
    }
  }

  /**
   * Get category by Id
   * @param req
   */
  @Get('/{id}')
  public async getCategoryById(req: Request) {
    try {
      const categoryId = req.params.id as string;
      if (!categoryId) {
        return new NotFoundError();
      }
      const category = await this.categoryService.getCategoryById(categoryId);
      return category;
    } catch (error) {
      return new NotFoundError(error);
    }
  }

  /**
   * Add a new category
   * @param req
   * @description the *req.body* object need to have name, email, balance
   */
  @Post('/add')
  public async addCategory(req: Request) {
    try {
      const { error } = validateAddCategory(req.body);
      if (error) {
        return new BadRequestError(error);
      }
      const category = req.body as ICategory;
      const createdCategory = await this.categoryService.addCategory(category);
      return createdCategory;
    } catch (error) {
      return new BadRequestError(error);
    }
  }

  /**
   * Update category By Id
   * @param req
   * @description the *req.body* object need to have any of these name, email, balance
   * and the *req.params* should have *id* as categoryId
   */
  @Put('/update/:id')
  public async updateCategory(req: Request) {
    try {
      console.log('category: ', req.body);
      const categoryId = req.params.id as string;
      if (!categoryId) {
        return new NotFoundError();
      }
      const { error } = validateUpdateCategory(req.body);
      if (error) {
        return new BadRequestError(error);
      }
      const category = req.body as ICategory;
      const updatedCategory = await this.categoryService.updateCategory(category, categoryId);
      return updatedCategory;
    } catch (error) {
      return new BadRequestError(error);
    }
  }

  /**
   * Delete category By Id
   * @param req
   * @description the *req.params* should have category ID
   */
  @Delete('/delete/:id')
  public async deleteCategory(req: Request) {
    try {
      const categoryId = req.params.id as string;
      if (!categoryId) {
        return new NotFoundError();
      }
      const deletedCategory = await this.categoryService.deleteCategory(categoryId);
      return deletedCategory;
    } catch (error) {
      return new BadRequestError(error);
    }
  }
}
