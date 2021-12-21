import path from "path";
import fs from "fs";


export interface IServerInfo {
    smtp: {
        host: string, port: number,
        auth: {user: string, pass: string}
    },
    imap: {
        host: string, port: number,
        auth: {user: string, port: number}
    }
}
export let serverInfo: IServerInfo;
const rawInfo: any = fs.readFileSync(path.join(__dirname, '../ServerInfo.json'));
serverInfo = JSON.parse(rawInfo);