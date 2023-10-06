import { Router, Request, Response } from "express";
import { DB, app } from "../server";
import { HttpError, HttpResponse } from "../response";
import crypto from "crypto";
import { protected_mw } from "../middleware/protected";
import { global_mw } from "../middleware/global";

export const authRouter: Router = Router();

authRouter
    // Use protected middleware so authenticated users dont access
    .post("/login", protected_mw, login)
    // Use global middleware so only authenticated user can access this route
    .post("/logout", global_mw, logout)
    .post("/register", protected_mw, register);

function login(req: Request, res: Response) {
    // This is bad but for this application we will proceed without validation
    const { username, password } = req.body;

    const user = DB.get_user_by_uA(username);

    if (!user) {
        // saying username or password is incorrect is a common thing to not expose details
        const err = new HttpError(403, "Username or password is incorrect");

        res.status(403).json(err);

        return;
    }

    // let check if they send good password the method used below is very bad
    // first we want to sue something like jsonwebtoken and other good hashing library will update this code to use in future
    // for now we will do it plainly

    if (!user.comparePassword(password)) {
        // saying username or password is incorrect is a common thing to not expose details
        const err = new HttpError(403, "Username or password is incorrect");

        res.status(403).json(err);

        return;
    }

    const _res = new HttpResponse(user, 200);

    // we are using any values to fix use a good hashing library and save the user id init
    const auth_token = `${crypto.randomUUID()}@${user._id}`;

    res.status(200).setHeader("_auth", auth_token).json(_res);
}

function register(req: Request, res: Response) {
    res.status(200).json({
        message: "This route wont be implemented",
    });
}

function logout(req: Request, res: Response) {
    res.removeHeader("_auth");

    res.status(200).json(new HttpResponse({ message: "User logged out" }, 200));
}
