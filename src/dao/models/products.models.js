import mongoose from 'mongoose';

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  code: String,
  price: {
    type: Number,
    required: true,
  },
  status: Boolean,
  stock: Number,
  category: String,
  thumbnails: String,
});

const productModel = mongoose.model(productsCollection, productsSchema);

export default productModel;
