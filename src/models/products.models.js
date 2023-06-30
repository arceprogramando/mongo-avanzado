import mongoose from 'mongoose';

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  status: Boolean,
  stock: Number,

});

const productModel = mongoose.model(productsCollection, productsSchema);

export default productModel;
