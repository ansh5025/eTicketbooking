import { Request, Response } from "express";
import { Ticket } from "../Modal/ticket";
import {
  NotFoundError,
  BadRequestError,
  orderStatus,
  UnAuthorizedError,
} from "../../ticketapp-common/src/index";
import { Order } from "../Modal/order";
const EXPIRATION_WINDOW = 15 * 60;
export const create = async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.body;
    //  check if ticket exist or not

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }

    // ceck if ticket is reserved or not
    const reserved = await ticket.isReserved();
    if (reserved) {
      throw new BadRequestError();
    }

    const expirationTime = new Date();
    expirationTime.setSeconds(expirationTime.getSeconds() + EXPIRATION_WINDOW);

    const order = Order.build({
      ticket,
      expiresAt: expirationTime,
      userId: req.currentUser!.id,
      status: orderStatus.created,
    });

    await order.save();

    res.status(201).send({ msg: "Order created Successfully", order });
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    let orders = await Order.find({});
    return res.send(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    let order = await Order.findById(req.params.id);
    return res.send(200).send(order);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    let order = await Order.findById(req.params.id);

    if (req.currentUser.id !== order?.userId) {
      throw new UnAuthorizedError();
    }
    order.status = orderStatus.cancelled;
    await order.save();
    return res.send(200).send(order);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    let order = await Order.findById(req.params.id);
    if (!order) {
      throw new BadRequestError();
    }

    order = await Order.findByIdAndDelete(req.params.id);
    return res.send(200).send(order);
  } catch (err) {
    res.status(500).send(err);
  }
};
