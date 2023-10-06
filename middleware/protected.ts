import { NextFunction as NF, Request, Response } from "express";

// This middleware will only check the header to see if we have authentication credentials else let us go
// This middleware won't parse the authentication credentials that's the job of the global middleware
export const protected_mw = (req: Request, res: Response, next: NF) => {
    if (req.headers._auth) {
        // they have authentication credentials here we will redirect them to dashboard or homepage

        res.status(301).redirect("/sales");

        return;
    }

    next();
};
