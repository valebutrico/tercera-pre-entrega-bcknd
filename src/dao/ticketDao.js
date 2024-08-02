import MongoDAO from "./mongoDao.js";
import Ticket from "../models/Ticket.js";

class TicketDAO extends MongoDAO {
  
  constructor() {
    super(Ticket);
  }
}

export default TicketDAO;
