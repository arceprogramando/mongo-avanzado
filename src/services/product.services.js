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
}

export default ProductService;
