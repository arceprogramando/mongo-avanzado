import { Router } from 'express';
import productModel from '../dao/models/products.models.js';
import uploadMiddleware from '../services/uploader.js';
import ProductController from '../controllers/products.controllers.js';

const router = Router();

const productController = new ProductController();

router.post('/', uploadMiddleware, productController.createProduct);

router.get('/', productController.getAllProduct);

router.get('/:pId', productController.getProductById);

// router.get('/:pid', async (req, res) => {
//   try {
//     const product = await productModel.findById({ _id: req.params.pid });

//     if (product) {
//       res.status(200).json(product);
//     } else {
//       res.status(404).json({ error: 'El producto no existe' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener el producto con el id solicitado' });
//   }
// });

router.put('/:pid', uploadMiddleware, async (req, res) => {
  try {
    const { pid } = req.params;
    const { title, description, code, price, status, stock, category } = req.body;

    let thumbnails = null;
    if (req.file) {
      thumbnails = `/upload/${req.file.filename}`;
    }

    if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
      return res.status(400).json({
        error: 'Todos los campos son requeridos',
      });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      pid,
      {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      },
      { new: true },
    );

    if (updatedProduct) {
      return res.status(200).json({ status: 'success', product: updatedProduct });
    }
    return res.status(404).json({ error: 'El producto no existe' });
  } catch (error) {
    return res.status(500).json({ error: `Error al actualizar el producto ${error}` });
  }
});

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
