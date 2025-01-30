import { TProduct } from './product.interface';

const productCategory = [
  'mountain',
  'road',
  'hybrid',
  'electric',
  'cruiser',
] as const;
const frameMaterial = ['carbon', 'aluminum', 'steel', 'titanium'] as const;
const brakeType = ['disc', 'rim', 'hydraulic'] as const;
const searchableFields: (keyof TProduct)[] = ['name', 'brand', 'category'];

export const ProductConstants = {
  productCategory,
  frameMaterial,
  brakeType,
  searchableFields,
};
