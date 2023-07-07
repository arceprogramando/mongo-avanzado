import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const cartsCollection = 'carts';

const cartItemSchema = new Schema({
  products: [
    {
      type: Types.ObjectId,
      ref: 'products',
    },
  ],
  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = new Schema({
  products: [cartItemSchema],
});

const CartModel = model(cartsCollection, cartSchema);

export default CartModel;
