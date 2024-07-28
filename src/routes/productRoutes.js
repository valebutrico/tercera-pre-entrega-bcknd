import { Router } from "express";
import ProductController from "../controllers/productController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = Router();
const productController = new ProductController();

router.get("/", AuthMiddleware.current, async (req, res) => {
  try {
    const productController = new ProductController();
    await productController.getProducts(req, res);
  } catch (error) {
    res.status(500).json({ message: "Error getting products" });
  }
});

router.post(
  "/",
  AuthMiddleware.current,
  roleMiddleware.checkRoles(["admin"]),
  productController.createProduct.bind(productController)
);

router.put(
  "/:id",
  AuthMiddleware.current,
  roleMiddleware.checkRoles(["admin"]),
  productController.updateProduct.bind(productController)
);

router.delete(
  "/:id",
  AuthMiddleware.current,
  roleMiddleware.checkRoles(["admin"]),
  productController.deleteProduct.bind(productController)
);

export default router;
