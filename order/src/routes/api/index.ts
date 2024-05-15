import express from "express";
import order from "./order";
const router = express.Router();

router.use("/order", order);

export default router;
