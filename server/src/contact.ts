import * as path from "path";
import Datastore from "nedb";
import Nedb from "nedb";

export interface IContact {
    _id?: number,
    name: string,
    email: string
}

export class Worker {
    private db: Nedb;
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "contacts.db"),
            autoload: true
        });
    }
}