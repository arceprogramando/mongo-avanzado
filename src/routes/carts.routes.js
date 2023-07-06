import { Router } from 'express';
import CartModel from '../dao/models/carts.models.js';

const router = Router();

// Creacion Create ("C".R.U.D) Para crear un nuevo carrito

router.post('/api/carts', async (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({ error: 'La lista de productos debe ser un array' });
    }

    const newCart = new CartModel({
      products,
    });

    const createdCart = await newCart.save();
    return res.status(201).json({ status: 'success', cart: createdCart });
  } catch (error) {
    return res.status(500).json({ error: 'Error al crear la Cart' });
  }
});

// Creacion Create ("C".R.U.D) Agrega o modifica un producto en un carrito existente

router.post('/api/carts/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await CartModel.findById(cid);
    if (!cart) {
      return res.status(404).json({ error: 'La cart no existe' });
    }

    const productIndex = cart.products.findIndex((product) => product.id === pid);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity = quantity;
    } else {
      cart.products.push({ id: pid, quantity });
    }

    const updatedCart = await cart.save();

    return res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(500).json({ error: 'Error al agregar o modificar el producto en el carrito' });
  }
});

// Lectura Read (C."R".U.D) Lectura de todas las carts creadas

router.get('/api/carts', async (req, res) => {
  try {
    const { limit } = req.query;
    let query = CartModel.find();

    if (limit) {
      query = query.limit(parseInt(limit, 10));
    }

    const carts = await query.exec();

    if (limit) {
      const limitedCarts = carts.slice(0, limit);
      res.status(200).json(limitedCarts);
    } else {
      res.status(200).json(carts);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los carritos' });
  }
});

// Lectura Read (C."R".U.D) Lectura de carts por id

router.get('/api/carts/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartModel.findById(cid);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: 'La búsqueda del id de la cart no existe' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la cart' });
  }
});

// Actualizacion Update (C.R."U".D)

router.put('/api/carts/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).json({ error: 'La lista de productos debe ser un array' });
    }

    const updatedCart = await CartModel.findByIdAndUpdate(cid, { products }, { new: true });

    if (updatedCart) {
      return res.status(200).json(updatedCart);
    }
    return res.status(404).json({ error: 'El carrito no existe' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar el carrito' });
  }
});

// Borrar Delete (C.R.U."D")

router.delete('/api/carts/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartModel.findByIdAndDelete(cid);

    if (!cart) {
      return res.status(404).json({ error: 'La cart no existe' });
    }

    return res.status(200).json({ status: 'success', message: 'La cart ha sido eliminada' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar la cart' });
  }
});

export default router;
