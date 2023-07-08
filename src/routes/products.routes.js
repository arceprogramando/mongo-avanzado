/* eslint-disable max-len */
import { Router } from 'express';
import productModel from '../dao/models/products.models.js';
import uploadMiddleware from '../services/uploader.js';
// import productData from '../data/products.js';

const router = Router();

// Creacion Create ("C".R.U.D)

// Aca esta la forma en la cual hice la insercion con mockaro siguiendo la prueba del profesor. Cree otra base de datos desde el .env

// router.get('/insertion', async (req, res) => {
//   try {
//     const result = await productModel.insertMany(productData);

//     return res.json({
//       message: 'bulk insertion successfully',
//       students: result,
//     });
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.log(
//       '🚀 ~ file: students.routes.js:19 ~ router.get ~ error:',
//       error,
//     );
//     return res.status(500).send({ status: 'error', error: 'Error al enviar la insercion de productos' });
//   }
// });

router.get('/api/products', async (req, res) => {
  try {
    const {
      limit, page = 1, sort, query,
    } = req.query;

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

    const totalCount = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    const products = await productModel
      .find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10));

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
    // eslint-disable-next-line no-console
    console.log(`Error al obtener los productos: ${error}`);
    return res.status(500).json({ status: 'error', error: 'Error interno del servidor' });
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
