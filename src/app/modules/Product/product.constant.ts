const productCategory = [
  'mountain',
  'road',
  'hybrid',
  'electric',
  'cruiser',
] as const;
const frameMaterial = ['carbon', 'aluminum', 'steel', 'titanium'] as const;
const brakeType = ['disc', 'rim', 'hydraulic'] as const;

export const ProductConstants = {
  productCategory,
  frameMaterial,
  brakeType,
};
