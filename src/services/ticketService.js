import DaoFactory from "../dao/factoryDao.js";

class TicketService {

  constructor() {
    this.ticketDao = DaoFactory.getDAO("ticket");
  }  

  async getAllTickets() {
    return await this.ticketDao.getAll();
  }

  async getTicketById(id) {
    return await this.ticketDao.getById(id);
  }

  async createTicket(data) {
    const ticketData = {
      ...data,
      purchase_datetime: new Date(),
      code: Math.random().toString(36).substring(2, 9), 
    };
    return await this.ticketDao.create(ticketData);
  }

  async updateTicket(id, data) {
    return await this.ticketDao.update(id, data);
  }

  async deleteTicket(id) {
    return await this.ticketDao.delete(id);
  }
}

export default TicketService;
