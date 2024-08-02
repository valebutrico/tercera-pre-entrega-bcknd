import MongoDAO from "./mongoDao.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
import Ticket from "../models/Ticket.js";

class DaoFactory {
  
  static getDAO(type) {
    switch (type) {
      case "user":
        return new MongoDAO(User);
      case "product":
        return new MongoDAO(Product);
      case "cart":
        return new MongoDAO(Cart);
      case "ticket":
        return new MongoDAO(Ticket);
      default:
        throw new Error("DAO type not supported");
    }
  }
}

export default DaoFactory;
