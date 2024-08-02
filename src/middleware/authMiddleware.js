import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class AuthMiddleware {
  
  static async current(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
      return res.redirect('/login');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.redirect('/login');
      }

      req.user = user;
      next();
    } catch (err) {
      return res.redirect('/login');
    }
  }
}

export default AuthMiddleware;
