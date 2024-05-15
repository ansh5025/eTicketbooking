import express from "express";
import { body } from "express-validator";
import {
  requestValidation,
  curruntUser,
  authValidation,
} from "../../../common/src/index";
import {
  create,
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
} from "../../controllers/ticketController";

const router = express.Router();
router.post(
  "/create",
  [
    body("title").not().isEmpty().withMessage("Title is Required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  requestValidation,
  curruntUser,
  create
);

router.get("/", getTickets);
router.get("/:id", getTicket);
router.post(
  "/update",
  [
    body("title").not().isEmpty().withMessage("Title is Required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  requestValidation,
  authValidation,
  updateTicket
);

router.delete("/:id", authValidation, deleteTicket);

export default router;
