import jwt from "jsonwebtoken";
import User from "../models/User.js";

class AuthController {

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error during login', error: error.message });
    }
  }

  static async register(req, res) {
    try {
      const { email, password, first_name, last_name, age, role } = req.body;
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).render('register', { error: 'Este usuario ya existe' });
      }

      const user = new User({
        email,
        password,
        first_name,
        last_name,
        age,
        role,
      });

      await user.save();
      res.render('register', { success: 'Usuario registrado exitosamente. Por favor, ' });
    } catch (error) {
      res.status(500).render('register', { error: 'Hubo un error en el registro', errorDetails: error.message });
    }
  }

  static logout(req, res) {
    req.logout();
    res.redirect("/login");
  }
}

export default AuthController;