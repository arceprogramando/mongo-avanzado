import ProductDao from '../repository/product.dao.js';

class ProductService {
  constructor() {
    this.productDao = new ProductDao();
  }

  createProduct = async (product) => {
    try {
      const createProduct = await this.productDao.createProduct(product);
      return createProduct;
    } catch (error) {
      throw new Error(`Error al crear el producto  en el service: ${error.message}`);
    }
  };

  getAllProduct = async (filter, sortOption) => {
    try {
      const getAllProduct = await this.productDao.getAllProduct(filter, sortOption);
      return getAllProduct;
    } catch (error) {
      throw new Error(`Error al traer los productos  en el service: ${error.message}`);
    }
  };

  countDocuments = async () => {
    try {
      const countDocuments = await this.productDao.countDocuments();
      return countDocuments;
    } catch (error) {
      throw new Error(`Error al contar los productos en el documento  en el service: ${error.message}`);
    }
  };
}

export default ProductService;
