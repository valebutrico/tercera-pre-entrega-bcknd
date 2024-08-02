import InterfaceDAO from "./interfaceDao.js";

class MongoDAO extends InterfaceDAO {
  
  constructor(model) {
    super();
    this.model = model;
  }

  async getAll() {
    return this.model.find({});
  }

  async getById(id) {
    return this.model.findById(id);
  }

  async create(item) {
    return this.model.create(item);
  }

  async update(id, item) {
    return this.model.findByIdAndUpdate(id, item, { new: true });
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}

export default MongoDAO;
