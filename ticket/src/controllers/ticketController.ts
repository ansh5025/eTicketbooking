import { Response, Request } from "express";
import { Ticket } from "../Modals/Ticket";
import { NotFoundError, UnAuthorizedError } from "../../common/src/index";
import { TicketCreatedPublisher } from "../events/publisher/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";
export const create = async (req: Request, res: Response) => {
  const doc = req.body || {};
  const { title, price } = doc;
  let ticket = Ticket.build({ title, price, userId: req.currentUser!.id });
  await ticket.save();
  new TicketCreatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    price: ticket.price,
    title: ticket.title,
    userId: ticket.userId,
  });

  return res.status(201).send(ticket);
};

export const getTickets = async (req: Request, res: Response) => {
  try {
    let tickets = await Ticket.find({});
    return res.status(200).send(tickets);
  } catch (err) {
    throw new Error("Error in getting Tickets");
  }
};

export const getTicket = async (req: Request, res: Response) => {
  let ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new NotFoundError();
  }

  res.status(200).send(ticket);
};

export const updateTicket = async (req: Request, res: Response) => {
  let ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new NotFoundError();
  }

  if (ticket.userId !== req.currentUser.id) {
    throw new UnAuthorizedError();
  }

  ticket.set({
    title: req.body.title,
    price: req.body.price,
  });

  await ticket.save();

  res.status(200).send(ticket);
};

export const deleteTicket = async (req: Request, res: Response) => {
  let ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new NotFoundError();
  }

  await Ticket.findByIdAndDelete(req.params.id);
  res.status(200).send(ticket);
};
