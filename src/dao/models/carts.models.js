import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const cartsCollection = 'carts';

const cartItemSchema = new Schema(
  {
    products: [
      {
        type: Types.ObjectId,
        ref: 'products',
        // Con index: true podria indexarlo
      },
    ],
    quantity: {
      type: Number,
      required: true,
    },
  },
  { default: [] },
);

const cartSchema = new Schema({
  products: [cartItemSchema],
});

const CartModel = model(cartsCollection, cartSchema);

export default CartModel;
