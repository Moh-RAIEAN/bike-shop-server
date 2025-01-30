import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { uploadImageToCloudinary } from '../../utils/uploadImageToCloudinary';
import { ProductConstants } from './product.constant';
import { TProduct } from './product.interface';
import Product from './product.model';

const createProductIntoDb = async (
  file: Express.Multer.File | undefined,
  payload: TProduct,
) => {
  const { name, brand, model } = payload;
  const isProductExist = await Product.findOne({ name, brand, model });
  if (isProductExist)
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `Product:- ${name} is already exist`,
    );

  if (file) {
    const { secure_url } = await uploadImageToCloudinary(file);
    payload.imageUrl = secure_url || '';
  }

  const createdProduct = await Product.create(payload);
  if (!createdProduct)
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Can not create product, internal serrver error',
    );
  return createdProduct;
};

const getAllProductsFromDb = async (query: Record<string, unknown>) => {
  const getAllProductsQuery = new QueryBuilder(Product.find(), query)
    .search(ProductConstants.searchableFields)
    .filter()
    .sort()
    .select()
    .paginate();

  const retrivedProducts = await getAllProductsQuery.modelQuery;
  const meta = await getAllProductsQuery.countTotal();
  if (!retrivedProducts?.length)
    throw new AppError(StatusCodes.NOT_FOUND, 'No product not found');
  return { meta, data: retrivedProducts };
};

const getSingleProductFromDb = async (productId: string) => {
  const isProductExist = await Product.findById(productId);
  if (!isProductExist)
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Requested product was not found',
    );
  return isProductExist;
};

export const ProductServices = {
  createProductIntoDb,
  getSingleProductFromDb,
  getAllProductsFromDb,
};
