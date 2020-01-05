import { injectable } from 'inversify';

import { Category } from '../schemas';
import { ICategory, Pagination, PaginatedList } from '../models';

@injectable()
export class CategoryService {
  public async getAllPaginatedCategories(pagination: Pagination): Promise<PaginatedList<ICategory>> {
    let filterConditions = {};
    if (pagination.searchTerm) {
      filterConditions = {
        $or: [
          { name: { $regex: pagination.searchTerm, $options: 'i' } },
          { email: { $regex: pagination.searchTerm, $options: 'i' } }
        ]
      };
    }
    const count = await Category.count(filterConditions).exec();
    const categories = await Category.find(filterConditions, { name: 1, email: 1, balance: 1, updatedAt: 1 })
      .skip(pagination.pageSize * (pagination.page - 1))
      .limit(pagination.pageSize)
      .sort(pagination.sortOrder)
      .exec();
    return PaginatedList.create(count, categories);
  }

  public async getCategoryById(categoryId: string): Promise<ICategory> {
    const category = await Category.findById({ _id: categoryId }).exec();
    return category;
  }

  public async getCategoryByName(name: string): Promise<ICategory> {
    const category = await Category.findOne({ name }).exec();
    return category;
  }

  public async addCategory(category: ICategory): Promise<ICategory> {
    const createdCategory = await new Category(category).save();
    return createdCategory;
  }

  public async updateCategory(category: ICategory, categoryId: string): Promise<ICategory> {
    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: categoryId },
      { $set: category },
      { new: true }
    ).exec();
    return updatedCategory;
  }

  public async deleteCategory(categoryId: string): Promise<ICategory> {
    const deletedCategory = await Category.findByIdAndDelete({ _id: categoryId }).exec();
    return deletedCategory;
  }

  public async testPromise(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 30);
    });
  }
}
