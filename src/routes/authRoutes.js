import { Router } from "express";
import AuthController from "../controllers/authController.js";
import passport from "passport";
import AuthMiddleware from "../middleware/authMiddleware.js";
import UserController from "../controllers/userController.js";

const router = Router();

router.get("/login", (req, res) => res.render("login"));
router.post("/login", AuthController.login);

router.get("/register", (req, res) => res.render("register"));
router.post("/register", AuthController.register);
router.post("/logout", AuthController.logout);

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/api/products");
  }
);

router.get("/current", AuthMiddleware.current, UserController.getCurrentUser);

export default router;
