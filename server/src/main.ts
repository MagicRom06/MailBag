import path from "path";
import express,
    {Express, NextFunction, Request, Response} from "express";
//import {serverInfo} from "./ServerInfo";
//import * as IMAP from "./IMAP";
//import * as SMTP from "./SMTP";
//import * as Contacts from "./contact";
//import {IContact} from "./Contacts";

const app: Express = express();
app.use(express.json());
app.use("/",
    express.static(path.join(__dirname, "../../client/dist"))
);