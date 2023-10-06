"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const server_1 = require("../server");
const response_1 = require("../response");
const crypto_1 = __importDefault(require("crypto"));
const protected_1 = require("../middleware/protected");
const global_1 = require("../middleware/global");
exports.authRouter = (0, express_1.Router)();
exports.authRouter
    // Use protected middleware so authenticated users dont access
    .post("/login", protected_1.protected_mw, login)
    // Use global middleware so only authenticated user can access this route
    .post("/logout", global_1.global_mw, logout)
    .post("/register", protected_1.protected_mw, register);
function login(req, res) {
    // This is bad but for this application we will proceed without validation
    const { username, password } = req.body;
    const user = server_1.DB.get_user_by_uA(username);
    if (!user) {
        // saying username or password is incorrect is a common thing to not expose details
        const err = new response_1.HttpError(403, "Username or password is incorrect");
        res.status(403).json(err);
        return;
    }
    // let check if they send good password the method used below is very bad
    // first we want to sue something like jsonwebtoken and other good hashing library will update this code to use in future
    // for now we will do it plainly
    if (!user.comparePassword(password)) {
        // saying username or password is incorrect is a common thing to not expose details
        const err = new response_1.HttpError(403, "Username or password is incorrect");
        res.status(403).json(err);
        return;
    }
    const _res = new response_1.HttpResponse(user, 200);
    // we are using any values to fix use a good hashing library and save the user id init
    const auth_token = `${crypto_1.default.randomUUID()}@${user._id}`;
    res.status(200).setHeader("_auth", auth_token).json(_res);
}
function register(req, res) {
    res.status(200).json({
        message: "This route wont be implemented",
    });
}
function logout(req, res) {
    res.removeHeader("_auth");
    res.status(200).json(new response_1.HttpResponse({ message: "User logged out" }, 200));
}
