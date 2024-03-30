import ProductModel from '../dao/models/products.models.js';

class ProductDao {
  constructor() {
    this.productModel = ProductModel;
  }

  createProduct = async (product) => {
    try {
      const createProduct = await this.productModel.create(product);
      return createProduct;
    } catch (error) {
      throw new Error('Error Al crear el producto en el dao');
    }
  };
}

export default ProductDao;
