import express from 'express';
import CartController from '../controllers/cartController.js';
import AuthMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', CartController.createCart);
router.get('/', CartController.getAllCarts);
router.delete('/:cid/products/:pid', CartController.deleteProductFromCart);
router.delete('/:cid', CartController.deleteAllProductsFromCart);
router.put('/:cid/products/:pid', CartController.updateProductQuantityInCart);
router.put('/:cid', CartController.updateCart);
router.get('/:cid', CartController.getCartById);
router.post('/:cid/products/:pid', CartController.addProductToCart);
router.post('/:cid/purchase', AuthMiddleware.current, CartController.purchaseCart);

export default router;
