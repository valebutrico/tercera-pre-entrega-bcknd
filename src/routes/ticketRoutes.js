import { Router } from 'express';
import TicketController from '../controllers/ticketController.js';

const router = Router();

router.post('/', TicketController.createTicket);
router.get('/', TicketController.getAllTickets);
router.get('/:id', TicketController.getTicketById);
router.put('/:id', TicketController.updateTicket);
router.delete('/:id', TicketController.deleteTicket);

export default router;
