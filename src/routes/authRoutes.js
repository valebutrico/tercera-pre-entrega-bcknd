import { Router } from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';
import AuthController from "../controllers/authController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";
import UserController from "../controllers/userController.js";

const router = Router();

// Login
router.get("/login", (req, res) => res.render("login"));
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('error', info.message);
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true });
      return res.redirect('/api/products');
    });
  })(req, res, next);
});

// Register
router.get("/register", (req, res) => res.render("register"));
router.post("/register", AuthController.register);

// Logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.clearCookie('token');
    res.redirect('/login');
  });
});

// Github
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

// Current
router.get("/current", AuthMiddleware.current, UserController.getCurrentUser);

export default router;
