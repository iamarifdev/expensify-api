export class Pagination {
  public page?: number;
  public pageSize?: number;
  public order?: string;
  public sort?: string;
  public searchTerm?: string;

  constructor(param: any) {
    this.page = param.page ? parseInt(param.page) : 1;
    this.pageSize = param.pageSize ? parseInt(param.pageSize) : 10;
    this.sort = param.sort || 'updatedAt';
    this.order = param.order || 'desc';
    this.searchTerm = param.searchTerm ? `.*${param.searchTerm}.*` : null;
  }

  get sortOrder() {
    return { [this.sort]: this.order };
  }
}
