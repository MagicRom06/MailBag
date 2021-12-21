"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
//import {serverInfo} from "./ServerInfo";
//import * as IMAP from "./IMAP";
//import * as SMTP from "./SMTP";
//import * as Contacts from "./contact";
//import {IContact} from "./Contacts";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
//# sourceMappingURL=main.js.map