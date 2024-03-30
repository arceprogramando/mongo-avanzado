import ProductService from '../services/product.services.js';

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  createProduct = async (req, res) => {
    try {
      const { title, description, code, price, status, stock, category } = req.body;

      let thumbnails = null;

      if (req.file) thumbnails = `/upload/${req.file.filename}`;

      if (!title) return res.status(400).json({ error: 'El título es obligatorio' });

      if (!description) return res.status(400).json({ error: 'La descripción es obligatoria' });

      if (!code) return res.status(400).json({ error: 'El código es obligatorio' });

      if (!price) return res.status(400).json({ error: 'El precio es obligatorio' });

      if (!stock) return res.status(400).json({ error: 'El stock es obligatorio' });

      if (!category) return res.status(400).json({ error: 'La categoría es obligatoria' });

      if (!thumbnails) return res.status(400).json({ error: 'El thumbnails es obligatorio' });

      const product = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      };

      const createdProduct = await this.productService.createProduct(product);

      return res.status(201).json({ status: 'success', product: createdProduct });
    } catch (error) {
      return res.status(500).send({ status: 'error', error: error.message });
    }
  };

  getAllProduct = async (req, res) => {
    try {
      const { limit, page = 1, sort, query } = req.query;

      let filter = {};

      if (query) filter = { category: query };

      const sortOption = sort === 'asc' ? { price: 1 } : { price: -1 };

      let productsQuery = this.productService.getAllProduct(filter, sortOption);

      if (limit) {
        const parsedLimit = Number(limit);
        productsQuery = productsQuery.skip((page - 1) * parsedLimit).limit(parsedLimit);
      }

      const products = await productsQuery;
      const totalCount = await this.productService.countDocuments(filter);
      const totalPages = limit ? Math.ceil(totalCount / parseInt(limit, 10)) : 1;

      const hasPrevPage = page > 1;
      const hasNextPage = page < totalPages;
      const prevLink = hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}` : null;
      const nextLink = hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}` : null;

      return res.json({
        status: 'success',
        payload: products,
        totalPages,
        prevPage: hasPrevPage ? page - 1 : null,
        nextPage: hasNextPage ? page + 1 : null,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink,
      });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  };

  getProductById = async (req, res) => {
    try {
      const { pId } = req.params;

      const getProductById = await this.productService.getProductById(pId);

      if (!getProductById) return res.status(404).json(`No se encontro el producto con el id ${pId}`);

      return res.json({ getProductById });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  };
}
export default ProductController;
