// export interface Packet {
//     body: 
// }

interface Header<T extends Purpose> {
    messagePurpose: T,
    requestId: string,
    version: number,
    messageType: T extends "event" | "error" ? null : "commandRequest"
}

type Purpose = "commandResponse" |
    "commandRequest" |
    "error" |
    "event" |
    "subscribe" |
    "unsubscribe";

/**
 * Body data of a command request.
 * This body is sent in a packet to request execution of a command.
 */
interface CommandRequest {
    /**The body version */
    version: number,
    /**A command to be executed. (i.e. for /say, enter "say") */
    commandLine: string
}

/**
 * Body data of a command response.
 * This body is received from the client and it contains properties about the command that was sent(via sending a `Packet` with a `CommandRequest` body).
 */
interface CommandResponseBase {
    statusCode: number,
    statusMessage: string | null
}

