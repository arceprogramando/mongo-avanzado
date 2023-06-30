import { Router } from 'express';
import productModel from '../models/products.models.js';

const router = Router();

// Lectura
router.get('/api/products', async (req, res) => {
  try {
    const products = await productModel.find();
    res.send({ result: 'success', payload: products });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`No se ha podido traer los products desde mongoose ${error}`);
  }
});

router.get('/api/products/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModel.find(pid);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'El producto no existe' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al obtener el producto con el id solicitado' });
  }
});

// Escritura

router.post('/api/products', async (req, res) => {
  const {
    title, description, price, status, stock,
  } = req.body;

  // if (!title || !description || !price || !status || !stock) {
  //   res.status(400).send({ status: 'error', error: 'Incomplete values' });
  //   return;
  // }
  try {
    const result = await productModel.create({
      title,
      description,
      price,
      status,
      stock,
    });
    res.send({ status: 'success', payload: result });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`Cannot create user with mongoose: ${error}`);
    res.status(500).send({ status: 'error', error: 'Internal server error' });
  }
});

export default router;
