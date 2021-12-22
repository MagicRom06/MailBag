import path from "path";
import fs from "fs";


export interface IServerInfo {
    smtp: {
        host: string, port: number,
        auth: {user: string, pass: string}
    },
    imap: {
        host: string, port: number,
        auth: {user: string, pass: string}
    }
}
const rawInfo: any = fs.readFileSync(path.join(__dirname, '../serverInfo.json'));
export let serverInfo: IServerInfo = JSON.parse(rawInfo);