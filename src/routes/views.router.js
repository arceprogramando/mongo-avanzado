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
    const { page = 1, limit = 10 } = req.query;

    const {
      docs, hasPrevPage, hasNextPage, nextPage, prevPage,
    } = await productModel.paginate({}, { limit, page, lean: true });

    res.render('realTimeProducts', {
      products: docs,
      style: 'index.css',
      page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
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
