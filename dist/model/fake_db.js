"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeDB = exports.User = void 0;
const crypto_1 = __importDefault(require("crypto"));
class User {
    constructor(id, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
    get _username() {
        return this.username;
    }
    get _id() {
        return this.id;
    }
    comparePassword(password) {
        return this.password === password;
    }
}
exports.User = User;
class FakeDB {
    constructor() {
        this._records = new Map();
        const _key = crypto_1.default.randomUUID();
        this._records.set(_key, new User(_key.toString(), "West05", "west@west.com", "12345"));
    }
    get records() {
        return this._records;
    }
    get_user(key) {
        return this._records.get(key);
    }
    // Get user by username
    get_user_by_uA(username) {
        let user = undefined;
        for (const [key, values] of this._records.entries()) {
            if (values._username === username) {
                user = values;
            }
        }
        return user;
    }
}
exports.FakeDB = FakeDB;
