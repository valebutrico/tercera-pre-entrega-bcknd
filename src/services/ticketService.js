import DaoFactory from "../dao/factoryDao.js";

class TicketService {
  constructor() {
    this.ticketDao = DaoFactory.getDAO("ticket");
  }

  async createTicket(data) {
    return await this.ticketDao.create(data);
  }

  async getAllTickets() {
    return await this.ticketDao.getAll();
  }

  async getTicketById(id) {
    return await this.ticketDao.getById(id);
  }

  async updateTicket(id, data) {
    return await this.ticketDao.update(id, data);
  }

  async deleteTicket(id) {
    return await this.ticketDao.delete(id);
  }
}

export default TicketService;
