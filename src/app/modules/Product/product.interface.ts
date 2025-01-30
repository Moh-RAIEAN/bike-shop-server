import { ProductConstants } from './product.constant';

export type TProductCategory =
  (typeof ProductConstants.productCategory)[number];

export type TFrameMaterial = (typeof ProductConstants.frameMaterial)[number];

export type TBrakeType = (typeof ProductConstants.brakeType)[number];

export type TProduct = {
  name: string;
  brand: string;
  modelName: string;
  imageUrl: string;
  category: TProductCategory;
  price: number;
  description?: string;
  frameMaterial: TFrameMaterial;
  wheelSize: number;
  gearCount: number;
  brakeType: TBrakeType;
  weight: number;
  quantity: number;
  batteryCapacity: number;
  topSpeed: number;
  engineType: string;
  maxPower: number;
  mileagePerLiter: number;
  inStock: boolean;
  isDeleted: boolean;
};
