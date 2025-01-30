import { Query } from 'mongoose';
import { excludeFieldsFromFilterQuery } from '../constants';

export default class QueryBuilder<T> {
  constructor(
    public modelQuery: Query<T[], T>,
    public query: Record<string, unknown>,
  ) {}

  search(searchableFields: string[]) {
    const { search = '' } = this.query;
    this.modelQuery.find({
      $or: searchableFields.map((field) => ({
        [field]: { $regex: search, $options: 'i' },
      })),
    });

    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    excludeFieldsFromFilterQuery.forEach((field) => delete queryObj[field]);
    this.modelQuery.find(queryObj);
    return this;
  }

  sort() {
    const { sort } = this.query;
    const sortBy = `${sort}`.split(',').join(' ');
    this.modelQuery.sort(sortBy);
    return this;
  }

  paginate() {
    const { page = 1, limit = 10 } = this.query;
    const skip = (Number(page) - 1) * Number(limit);
    this.modelQuery.skip(skip).limit(Number(limit));
    return this;
  }

  select() {
    const { fields = '-__v' } = this.query;
    const selectedFields = `${fields}`.split(',').join(' ');
    this.modelQuery.select(selectedFields);
    return this;
  }
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}
