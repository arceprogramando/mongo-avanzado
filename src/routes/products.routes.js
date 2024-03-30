import { Router } from 'express';
import uploadMiddleware from '../services/uploader.js';
import ProductController from '../controllers/products.controllers.js';

const router = Router();

const productController = new ProductController();

router.post('/', uploadMiddleware, productController.createProduct);

router.get('/', productController.getAllProduct);

router.get('/:pId', productController.getProductById);

router.put('/:pId', uploadMiddleware, productController.updateProduct);

router.delete('/:pId', productController.deleteProduct);

export default router;
