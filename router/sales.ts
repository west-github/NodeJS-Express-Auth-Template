// THis is a sales dashboard only authenticated user should access

import { Router, Request, Response } from "express";
import { global_mw } from "../middleware/global";

export const salesRouter = Router();

// this will protect unauthenticated users from access any of sales middleware
//  using all as this is just a dummy representation of user
salesRouter.use(global_mw).all("*", (req: Request, res: Response) => {
    res.status(200).send("Welcome to the sales dashboard");
});
