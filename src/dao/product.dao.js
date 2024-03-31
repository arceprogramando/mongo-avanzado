import ProductModel from '../models/products.models.js';

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

  getAllProduct = async (filter, sortOption) => {
    try {
      const getAllProduct = await this.productModel.find(filter).sort(sortOption);
      return getAllProduct;
    } catch (error) {
      throw new Error('Error al traer los productos en el dao');
    }
  };

  countDocuments = async () => {
    try {
      const countDocuments = await this.productModel.countDocuments();
      return countDocuments;
    } catch (error) {
      throw new Error('Error al contar los productos en el dao');
    }
  };

  getProductById = async (pId) => {
    try {
      const getProductById = await this.productModel.findById(pId);
      return getProductById;
    } catch (error) {
      throw new Error(`Error al traer el producto con el id ${pId} en el dao`);
    }
  };

  updateProduct = async (pId, updatedProductData) => {
    try {
      const updateProduct = await this.productModel.findByIdAndUpdate(pId, updatedProductData);
      return updateProduct;
    } catch (error) {
      throw new Error(`Error al actualizar el producto con el id ${pId} en el dao`);
    }
  };

  deleteProduct = async (pId) => {
    try {
      const deleteProduct = await this.productModel.findByIdAndDelete(pId);
      return deleteProduct;
    } catch (error) {
      throw new Error(`Error al eliminar el producto con el id ${pId} en el dao`);
    }
  };
}

export default ProductDao;
