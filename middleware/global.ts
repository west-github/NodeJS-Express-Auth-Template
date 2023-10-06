import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../response";
import { UUID } from "crypto";
import { DB } from "../server";

export const global_mw = (req: Request, res: Response, next: NextFunction) => {
    const auth_token = req.headers._auth as string;

    // const return_to = req.;
    // fix return to

    if (!auth_token) {
        const _res = new HttpResponse(
            { message: "You are not logged in" },
            403
        );

        res.status(403).json(_res);

        return;
    }

    // We used a dummy auth token in production we will need a valid auth token that will have timestamp and expiration date
    // so we can check if the token has expired or valid  but here we will assume it's valid and onlu check for the user_id

    const [_, user_id] = auth_token.split("@");

    // check if auth token is valid this is bad for production btw

    if (!user_id) {
        // hmmm user get here because they have the auth token let remove it cause they sending a bad one

        const _res = new HttpResponse(
            { message: "You are not logged in" },
            403
        );

        res.removeHeader("_auth");

        res.status(403).json(_res);

        return;
    }

    const user = DB.get_user(user_id);

    if (!user) {
        // hmmm user get here because they have the auth token let remove it cause they sending a bad one

        const _res = new HttpResponse(
            { message: "You are not logged in" },
            403
        );

        res.removeHeader("_auth");

        res.status(403).json(_res);

        return;
    }

    // FIXME put user into state so router can use it

    next();
};
