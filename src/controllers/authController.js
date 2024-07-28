import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

class AuthController {

  static async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  }

  static async register(req, res) {
    const { email, password, first_name, last_name } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      first_name,
      last_name,
    });

    await user.save();
    res.json({ message: "User registered successfully" });
  }

  static logout(req, res) {
    req.logout();
    res.redirect("/login");
  }
}

export default AuthController;
