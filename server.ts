import dotenv from "dotenv";
import express, { Express } from "express";
import { authRouter } from "./router/auth";
import { salesRouter } from "./router/sales";
import { FakeDB } from "./model/fake_db";

dotenv.config();

export const app: Express = express();

// we need this for the body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// expose our fake database to other module mind you this can be other database connection like firebase or mongodb
export const DB: FakeDB = new FakeDB();

// app.routes
app.use("/authentication", authRouter);

// sales routes
app.use("/sales", salesRouter);

// Read the Port from env or set it to 4000
app.listen(process.env.PORT || 4000, () => {
    const logger = `✈️  [server]: Server is running at http://localhost:${process.env.PORT}`;

    console.log(logger);
});
