import { Router } from 'express';
import productModel from '../dao/models/products.models.js';
import uploadMiddleware from '../services/uploader.js';
import ProductController from '../controllers/products.controllers.js';

const router = Router();

const productController = new ProductController();

router.post('/', uploadMiddleware, productController.createProduct);

router.get('/', async (req, res) => {
  try {
    const { limit, page = 1, sort, query } = req.query;

    let filter = {};
    if (query) {
      filter = { category: query };
    }

    let sortOption = {};
    if (sort === 'asc') {
      sortOption = { price: 1 };
    } else if (sort === 'desc') {
      sortOption = { price: -1 };
    }

    let products;
    if (limit) {
      products = await productModel
        .find(filter)
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(parseInt(limit, 10));
    } else {
      products = await productModel.find(filter).sort(sortOption);
    }

    const totalCount = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevLink = hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}` : null;
    const nextLink = hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}` : null;

    return res.json({
      status: 'success',
      payload: products,
      totalPages,
      prevPage: hasPrevPage ? page - 1 : null,
      nextPage: hasNextPage ? page + 1 : null,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    });
  } catch (error) {
    console.log(`Error al obtener los productos: ${error}`);
    return res.status(500).json({ status: 'error', error: 'Error interno del servidor' });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const product = await productModel.findById({ _id: req.params.pid });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'El producto no existe' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto con el id solicitado' });
  }
});

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
