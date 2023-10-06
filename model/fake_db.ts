import crypto, { UUID } from "crypto";

export class User {
    private id: string;
    private username: string;
    // Lol in real application you don't want to save the real password
    private password: string;
    private email: string;

    constructor(id: string, username: string, email: string, password: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    get _username(): string {
        return this.username;
    }

    get _id(): string {
        return this.id;
    }

    comparePassword(password: string): boolean {
        return this.password === password;
    }
}

export class FakeDB {
    private _records: Map<string, User> = new Map();

    constructor() {
        const _key = crypto.randomUUID();

        this._records.set(
            _key,
            new User(_key.toString(), "West05", "west@west.com", "12345")
        );
    }

    get records(): Map<string, User> {
        return this._records;
    }

    get_user(key: string): User | undefined {
        return this._records.get(key);
    }

    // Get user by username
    get_user_by_uA(username: string): User | undefined {
        let user: User | undefined = undefined;

        for (const [key, values] of this._records.entries()) {
            if (values._username === username) {
                user = values;
            }
        }

        return user;
    }
}
