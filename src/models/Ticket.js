import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
  purchase_datetime: { type: Date, required: true },
  code: { type: String, required: true }
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
