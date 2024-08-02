import DaoFactory from "../dao/factoryDao.js";

class UserService {

  constructor() {
    this.userDao = DaoFactory.getDAO("user");
  }

  async getAllUsers() {
    return await this.userDao.getAll();
  }

  async getUserById(id) {
    return await this.userDao.getById(id);
  }  

  async createUser(userData) {
    return await this.userDao.create(userData);
  }

  async updateUser(id, userData) {
    return await this.userDao.update(id, userData);
  }

  async deleteUser(id) {
    return await this.userDao.delete(id);
  }
}

export default UserService;
