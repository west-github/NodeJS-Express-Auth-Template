"use strict";
// THis is a sales dashboard only authenticated user should access
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesRouter = void 0;
const express_1 = require("express");
const global_1 = require("../middleware/global");
exports.salesRouter = (0, express_1.Router)();
// this will protect unauthenticated users from access any of sales middleware
//  using all as this is just a dummy representation of user
exports.salesRouter.use(global_1.global_mw).all("*", (req, res) => {
    res.status(200).send("Welcome to the sales dashboard");
});
