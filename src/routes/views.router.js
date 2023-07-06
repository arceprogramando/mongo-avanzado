import { Router } from 'express';
import productModel from '../dao/models/products.models.js';
import configObject from '../config/config.js';
import messageModel from '../dao/models/message.models.js';

const router = Router();
const { PORT } = configObject;

router.get('/', async (req, res) => {
  const findproducts = await productModel.find();
  const products = findproducts.map((product) => product.toObject());
  // eslint-disable-next-line no-console
  console.log(products);
  res.render('home', {
    products,
    style: 'index.css',
    port: PORT,
  });
});

router.get('/realtimeproducts', async (req, res) => {
  try {
    const findproducts = await productModel.find();
    const products = findproducts.map((product) => product.toObject());
    // Aqui envio mis products
    res.render('realTimeProducts', {
      products,
      style: 'index.css',
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

router.get('/chat', async (req, res) => {
  try {
    const findmessage = await messageModel.find();
    const messages = findmessage.map((message) => message.toObject());
    // Aqui envio mis products
    res.render('chat', {
      messages,
      style: 'index.css',
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});
export default router;
