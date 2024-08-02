import { Router } from "express";
import UserController from "../controllers/userController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);
router.get("/current", AuthMiddleware.current, UserController.getCurrentUser);

router.post("/users", UserController.createUser);

router.put("/users/:id", UserController.updateUser);

router.delete("/users/:id", UserController.deleteUser);

export default router;

