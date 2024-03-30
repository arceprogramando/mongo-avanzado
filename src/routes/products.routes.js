import { Router } from 'express';
import productModel from '../dao/models/products.models.js';
import uploadMiddleware from '../services/uploader.js';
import ProductController from '../controllers/products.controllers.js';

const router = Router();

const productController = new ProductController();

router.post('/', uploadMiddleware, productController.createProduct);

router.get('/', productController.getAllProduct);

router.get('/:pId', productController.getProductById);

router.put('/:pId', uploadMiddleware, productController.updateProduct);

router.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await productModel.findById({ _id: pid });

    if (!product) {
      return res.status(404).json({ error: 'El producto no existe' });
    }

    await productModel.findByIdAndDelete({ _id: pid });

    return res.status(200).json({ status: 'success', message: 'Producto eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: `Error al eliminar el producto: ${error}` });
  }
});

export default router;
