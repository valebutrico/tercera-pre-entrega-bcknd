import UserService from "../services/userService.js";
import UserCurrentDTO from "../dto/UserCurrentDto.js";

const userService = new UserService();

class UserController {
  
  static async getAllUsers(req, res) {
    const users = await userService.getAllUsers();
    res.json(users);
  }

  static async getUserById(req, res) {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  }

  static async createUser(req, res) {
    const user = await userService.createUser(req.body);
    res.json(user);
  }

  static async updateUser(req, res) {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  }

  static async deleteUser(req, res) {
    await userService.deleteUser(req.params.id);
    res.sendStatus(204);
  }

  static async getCurrentUser(req, res) {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const userDTO = new UserCurrentDTO(user);
    res.json(userDTO);
  }
}

export default UserController;
