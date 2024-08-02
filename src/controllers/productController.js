import ProductRepository from "../repositories/productRepository.js";

class ProductController {
  
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getProducts(req, res) {
    try {
      const products = await this.productRepository.getAll();

      if (req.headers['content-type'] === 'application/json' || req.xhr) {
        res.json(products);
      } else {
        res.render('products', {
          productos: products,
          username: `${req.user.first_name} ${req.user.last_name}`,
          role: req.user.role,
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Error getting products" });
    }
  }

  async createProduct(req, res) {
    try {
      const product = await this.productRepository.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: "Error creating product" });
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await this.productRepository.update(id, req.body);
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Error updating product" });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      await this.productRepository.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting product" });
    }
  }
}

export default ProductController;
