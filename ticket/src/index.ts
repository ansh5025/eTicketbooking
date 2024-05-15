import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import routes from "./routes";
import { errorHandler } from "../common/src/index";
import { natsWrapper } from "./nats-wrapper";
import { randomBytes } from "crypto";

const port = process.env.PORT || 3000;
const app = express();

app.set("trust proxy", true);
app.use(json());
// using routes
app.use("/", routes);
app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT KEY Env Not Found");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO URI Not Found");
  }
  try {
    await natsWrapper.connect(
      "ticket",
      randomBytes(4).toString("hex"),
      "http://nats-srv:4222"
    );

    natsWrapper.client.on("close", () => {
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("Coonected to Ticket DB");
  } catch (err) {
    console.log(err);
  }
  app.listen(port, () => {
    console.log(`server is up & running at ${port} !!`);
  });
};

start();
