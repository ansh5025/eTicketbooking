import express from "express";
import mongoose from "mongoose";
import { body } from "express-validator";
import {
  requestValidation,
  authValidation,
} from "../../../ticketapp-common/src/index";
import { create } from "../../controller/order-controller";

const router = express.Router();
router.post(
  "/create",
  authValidation,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TickerId is Required"),
  ],
  requestValidation,
  create
);

export default router;
