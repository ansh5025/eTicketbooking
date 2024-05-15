import mongoose, { Mongoose } from "mongoose";
import { orderStatus } from "../../ticketapp-common/src/index";
import { TicketDoc } from "./ticket";

interface OrderAttrs {
  userId: string;
  status: orderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}
interface OrderDoc extends mongoose.Document {
  userId: string;
  status: orderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: mongoose.Schema.Types.Date,
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(orderStatus),
    default: orderStatus.created,
  },
});

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order");
export { orderStatus };
export { Order };
