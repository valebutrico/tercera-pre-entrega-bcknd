import jwt from "jsonwebtoken";
import User from "../models/User.js";

class AuthMiddleware {
  static async current(req, res, next) {
    const token = req.query.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.redirect("/login");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (err) {
      res.status(400).json({ message: "Token is not valid" });
    }
  }
}

export default AuthMiddleware;
