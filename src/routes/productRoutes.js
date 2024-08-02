import { Router } from "express";
import ProductController from "../controllers/productController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = Router();
const productController = new ProductController();

router.get("/", AuthMiddleware.current, productController.getProducts.bind(productController));

router.post("/", AuthMiddleware.current, roleMiddleware.checkRoles(["admin"]),productController.createProduct.bind(productController));

router.put("/:id", AuthMiddleware.current, roleMiddleware.checkRoles(["admin"]), productController.updateProduct.bind(productController));

router.delete("/:id", AuthMiddleware.current, roleMiddleware.checkRoles(["admin"]), productController.deleteProduct.bind(productController));

export default router;
