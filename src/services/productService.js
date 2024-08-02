import ProductDao from '../dao/productDao.js';

class ProductService {

    static async getAllProducts() {
        return await ProductDao.findAll();
    }

    static async getProductById(id) {
        return await ProductDao.findById(id);
    }

    static async createProduct(productData) {
        return await ProductDao.create(productData);
    }

    static async updateProduct(id, productData) {
        return await ProductDao.update(id, productData);
    }
    
    static async deleteProduct(id) {
        return await ProductDao.delete(id);
    }
}

export default ProductService;
