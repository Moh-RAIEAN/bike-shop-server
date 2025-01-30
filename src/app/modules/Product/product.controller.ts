import catchAsync from '../../middlewares/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';

const createProduct = catchAsync(async (req, res) => {
  const productData = req.body;
  const file = req.file;
  const createdProduct = await ProductServices.createProductIntoDb(
    file,
    productData,
  );
  sendResponse(res, {
    message: 'Product created successfully',
    data: createdProduct,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const query = req.query;
  const retrivedUsersData = await ProductServices.getAllProductsFromDb(query);
  sendResponse(res, {
    message: 'Products retrived successfully',
    meta: retrivedUsersData?.meta,
    data: retrivedUsersData?.data,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const productId = req.params?.productId;
  const createdProduct =
    await ProductServices.getSingleProductFromDb(productId);
  sendResponse(res, {
    message: 'Product is retrived successfully',
    data: createdProduct,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const productId = req.params?.productId;
  const productData = req.body;
  const file = req.file;
  const updatedProduct = await ProductServices.updateProductIntoDb(
    productId,
    file,
    productData,
  );
  sendResponse(res, {
    message: 'Product updated successfully',
    data: updatedProduct,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
};
