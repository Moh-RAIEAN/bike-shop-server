import { model, Schema } from 'mongoose';
import setDefaultSchemaOptions from '../../../helpers/applyDefaultSchema';
import { ProductConstants } from './product.constant';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: {
      values: ProductConstants.productCategory,
    },
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  frameMaterial: {
    type: String,
    enum: ProductConstants.frameMaterial,
    required: true,
  },
  wheelSize: {
    type: Number,
    required: true,
  },
  gearCount: {
    type: Number,
    required: true,
  },
  brakeType: {
    type: String,
    enum: ProductConstants.brakeType,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  batteryCapacity: {
    type: Number,
    required: true,
  },
  topSpeed: {
    type: Number,
    required: true,
  },
  engineType: {
    type: String,
    required: true,
  },
  maxPower: {
    type: Number,
    required: true,
  },
  mileagePerLiter: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

setDefaultSchemaOptions(productSchema);

const Product = model<TProduct>('Product', productSchema);

export default Product;
