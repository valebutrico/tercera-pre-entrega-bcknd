import TicketService from "../services/ticketService.js";

const ticketService = new TicketService();

class TicketController {

  static async getAllTickets(req, res) {
    try {
      const tickets = await ticketService.getAllTickets();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ message: "Error getting tickets", error });
    }
  }

  static async getTicketById(req, res) {
    try {
      const ticket = await ticketService.getTicketById(req.params.id);
      res.json(ticket);
    } catch (error) {
      res.status(500).json({ message: "Error getting ticket", error });
    }
  }

  static async createTicket(req, res) {
    try {
      const ticket = await ticketService.createTicket(req.body);
      res.json(ticket);
    } catch (error) {
      res.status(500).json({ message: "Error creating ticket", error });
    }
  }

  static async updateTicket(req, res) {
    try {
      const ticket = await ticketService.updateTicket(req.params.id, req.body);
      res.json(ticket);
    } catch (error) {
      res.status(500).json({ message: "Error updating ticket", error });
    }
  }

  static async deleteTicket(req, res) {
    try {
      await ticketService.deleteTicket(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Error deleting ticket", error });
    }
  }
}

export default TicketController;
