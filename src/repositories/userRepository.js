import InterfaceRepository from "./interfaceRepository.js";
import DAOFactory from "../dao/factoryDao.js";

class UserRepository extends InterfaceRepository {
  constructor() {
    super();
    this.dao = DAOFactory.getDAO("mongo");
  }

  async getAll() {
    return this.dao.getAll();
  }

  async getById(id) {
    return this.dao.getById(id);
  }

  async create(item) {
    return this.dao.create(item);
  }

  async update(id, item) {
    return this.dao.update(id, item);
  }

  async delete(id) {
    return this.dao.delete(id);
  }
}

export default UserRepository;
