export class PaginatedList<T> {
  private constructor(private count: number, private items: T[]) {}

  static create<T>(count: number, items: T[]) {
    return new PaginatedList(count, items);
  }
}
