import mongoose from 'mongoose';

const cartsCollection = 'carts';

const cartItemSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema({
  products: [cartItemSchema],
});

const CartModel = mongoose.model(cartsCollection, cartSchema);

export default CartModel;
