import { Router } from 'express';
import productModel from '../dao/models/products.models.js';
import uploadMiddleware from '../services/uploader.js';

const router = Router();

// Creacion Create ("C".R.U.D)

router.post('/api/products', uploadMiddleware, async (req, res) => {
  try {
    const {
      title, description, code, price, status, stock, category,
    } = req.body;
    let thumbnails = null;

    if (req.file) {
      thumbnails = `/upload/${req.file.filename}`;
    }

    if (!(title && description && code && price && status && stock && category && thumbnails)) {
      return res.status(400).json({
        error: 'Todos los campos son requeridos',
      });
    }

    const product = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    };

    const createdProduct = await productModel.create(product);

    return res.send({ status: 'success', payload: createdProduct });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`No se ha podido crear los productos desde mongoose: ${error}`);
    return res.status(500).send({ status: 'error', error: 'Internal server error' });
  }
});

// Lectura Read (C."R".U.D)

router.get('/api/products', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productModel.find({});

    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.status(200).json(limitedProducts);
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`No se ha podido traer los productos desde mongoose: ${error}`);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Lectura Read (C."R".U.D) por id usando findByID de mongoose

router.get('/api/products/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModel.findById(pid);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'El producto no existe' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto con el id solicitado' });
  }
});

// Actualizacion Update (C.R."U".D)

router.put('/api/products/:pid', uploadMiddleware, async (req, res) => {
  try {
    const { pid } = req.params;
    const {
      title, description, code, price, status, stock, category,
    } = req.body;

    let thumbnails = null;
    if (req.file) {
      thumbnails = `/upload/${req.file.filename}`;
    }

    if (
      !title
      || !description
      || !code
      || !price
      || !status
      || !stock
      || !category
      || !thumbnails
    ) {
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

// Borrar Delete (C.R.U."D")

router.delete('/api/products/:pid', async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await productModel.findById(pid);

    if (!product) {
      return res.status(404).json({ error: 'El producto no existe' });
    }

    await productModel.findByIdAndDelete(pid);

    return res.status(200).json({ status: 'success', message: 'Producto eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: `Error al eliminar el producto: ${error}` });
  }
});

export default router;
