"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protected_mw = void 0;
// This middleware will only check the header to see if we have authentication credentials else let us go
// This middleware won't parse the authentication credentials that's the job of the global middleware
const protected_mw = (req, res, next) => {
    if (req.headers._auth) {
        // they have authentication credentials here we will redirect them to dashboard or homepage
        res.status(301).redirect("/sales");
        return;
    }
    next();
};
exports.protected_mw = protected_mw;
