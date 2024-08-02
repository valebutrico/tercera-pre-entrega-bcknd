import { Router } from 'express';
import TicketController from '../controllers/ticketController.js';

const router = Router();

router.get('/', TicketController.getAllTickets);
router.get('/:id', TicketController.getTicketById);

router.post('/', TicketController.createTicket);

router.put('/:id', TicketController.updateTicket);

router.delete('/:id', TicketController.deleteTicket);

export default router;
