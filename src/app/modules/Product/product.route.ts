import { Router } from 'express';
import auth from '../../middlewares/auth';
import catchAsync from '../../middlewares/catchAsync';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/uploadImageToCloudinary';
import { UserConstants } from '../User/user.constants';
import { ProductControllers } from './product.controller';
import { ProductValidations } from './product.validation';

export const ProductRouter: Router = Router();

ProductRouter.post(
  '/create-product',
  auth(UserConstants.userRolesMapper.admin),
  upload.single('productImage'),
  catchAsync(async (req, _res, next) => {
    const productData = req.body?.productData;
    const parsedUserData = JSON.parse(productData);
    req.body = parsedUserData;
    next();
  }),
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createProduct,
);
ProductRouter.get('/', ProductControllers.getAllProducts);
ProductRouter.get('/:productId', ProductControllers.getSingleProduct);
