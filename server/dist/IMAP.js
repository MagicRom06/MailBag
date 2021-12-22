"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "o";
class Worker {
    constructor(inServerInfo) {
        Worker.serverInfo = inServerInfo;
    }
}
exports.Worker = Worker;
//# sourceMappingURL=IMAP.js.map