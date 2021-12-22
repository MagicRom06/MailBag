import ImapClient from "emailjs-imap-client";
import { ParsedMail } from "mailparser";
import { simpleParser } from "mailparser";
import { IServerInfo } from "./ServerInfo";

export interface ICallOptions {
    mailbox: string,
    id?: number
}

export interface IMessage {
    id: string,
    date: string,
    from: string,
    subject: string,
    body?: string
}

export interface IMailbox {name: string, path: string}

process.env.NODE_TLS_REJECT_UNAUTHORIZED  = "o";

export class Worker {
    private static serverInfo: IServerInfo;
    constructor(inServerInfo: IServerInfo) {
        Worker.serverInfo = inServerInfo;
    }

    private async connectToServer(): Promise<any> {
        const client: any = new ImapClient.default(
            Worker.serverInfo.imap.host,
            Worker.serverInfo.imap.port,
            {auth: Worker.serverInfo.imap.auth}
        );
        client.logLevel = client.LOG_LEVEL_NONE;
        client.onerror = (inError: Error) => {
            console.log(
                "IMAP.Worker.listMailBoxes(): Connection error", inError
            );
        };
        await client.connect();
        return client;
    }

    public async listMailBoxes(): Promise<IMailbox[]> {
        const client: any = await this.connectToServer();
        const mailboxes: any = await client.listMailBoxes();
        await client.close();
        const finalMailBoxes: IMailbox[] = [];
        const iterateChildren: Function = (inArray: any[]): void => {
            inArray.forEach((inValue: any) => {
                finalMailBoxes.push({
                    name: inValue.name, path: inValue.path
                });
                iterateChildren(inValue.children);
            });
        };
        iterateChildren(mailboxes.children);
        return finalMailBoxes;
    }

    public async listMessages(inCallOptions: ICallOptions): Promise<IMessage[]> {
        const client: any = await this.connectToServer();
        const mailbox: any = await client.selectMailBox(inCallOptions.mailbox);
        if (mailbox.exists === 0) {
            await client.close();
            return []
        }
        const messages: any[] = await client.listMessages(
            inCallOptions.mailbox, "1:*", ["uid", "envelope"]
        );
        await client.close();
        const finalMessages: IMessage[] = [];
        messages.forEach((inValue: any) => {
            finalMessages.push({
                id: inValue.uid,
                date: inValue.envelope.date,
                from: inValue.envelope.from[0].adress,
                subject: inValue.envelope.subject
            });
        });
        return finalMessages;
    }
}