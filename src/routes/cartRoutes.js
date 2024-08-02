import express from 'express';
import CartController from '../controllers/cartController.js';
import AuthMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', CartController.getAllCarts);
router.get('/:cid', CartController.getCartById);

router.post('/', CartController.createCart);
router.post('/:cid/products/:pid', CartController.addProductToCart);
router.post('/:cid/purchase', AuthMiddleware.current, CartController.purchaseCart);

router.put('/:cid/products/:pid', CartController.updateProductQuantityInCart);
router.put('/:cid', CartController.updateCart);

router.delete('/:cid', CartController.deleteCart);
router.delete('/:cid/products/:pid', CartController.deleteProductFromCart);

export default router;
