"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = exports.app = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const auth_1 = require("./router/auth");
const sales_1 = require("./router/sales");
const fake_db_1 = require("./model/fake_db");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
// we need this for the body
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
// expose our fake database to other module mind you this can be other database connection like firebase or mongodb
exports.DB = new fake_db_1.FakeDB();
// app.routes
exports.app.use("/authentication", auth_1.authRouter);
// sales routes
exports.app.use("/sales", sales_1.salesRouter);
// Read the Port from env or set it to 4000
exports.app.listen(process.env.PORT || 4000, () => {
    const logger = `✈️  [server]: Server is running at http://localhost:${process.env.PORT}`;
    console.log(logger);
});
