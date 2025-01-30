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

export const ProductControllers = {
  createProduct,
};
