///<reference path="./event/events.d.ts" />

import { v4 } from 'uuid';
export interface Packet<T extends Purpose> {
    header: Header<T>,
    body: Body<T>
}

interface Header<T extends Purpose> {
    messagePurpose: T,
    requestId: string,
    version: number,
    messageType: T extends "event" | "error" ? null : "commandRequest"
}

/**
 * Collection of functions for creating and manipulating packets
 */
export namespace Packet {
    export function createSubscribePacket(eventName: APIEvent): Packet<"subscribe"> {
        return {
            body: {
                eventName
            },
            header: {
                messagePurpose: "subscribe",
                messageType: "commandRequest",
                requestId: v4(),
                version: 1
            }
        }
    }

    export function createUnsubscribePacket(eventName: APIEvent): Packet<"unsubscribe"> {
        return {
            body: {
                eventName
            },
            header: {
                messagePurpose: "unsubscribe",
                messageType: "commandRequest",
                requestId: v4(),
                version: 1
            }
        };
    }

    export function createCommandRequestPacket(commandLine: string): Packet<"commandRequest"> {
        return {
            body: {
                version: 1,
                commandLine
            },
            header: {
                messagePurpose: "commandRequest",
                messageType: "commandRequest",
                version: 1,
                requestId: v4()
            }
        };
    }

    /**
     * Checks if the packet is an error packet.
     * Returns true if the statusCode is less than 0
     */
    export function isErrorPacket(packet: Packet<any>): packet is Packet<"error"> {
        return packet.body.statusCode < 0;
    }

    /**
     * Checks if the packet is a command error packet.
     * Returns true if the statusCode is less than 0
     */
    export function isCommandErrorPacket(packet: Packet<any>): packet is Packet<"commandResponse"> {
        return packet.body.statusCode < 0;
    }
}

type Body<T extends Purpose> = BodyToPurposeMap[T];

interface BodyToPurposeMap {
    "commandResponse": CommandResponseBase,
    "commandRequest": CommandRequest,
    "event": Event,
    "error": Error,
    "subscribe": Subscribe,
    "unsubscribe": Unsubscribe
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
    /**Error code received if the a command request fails. If the request is successful, this value is 0, else the value is less than 0*/
    statusCode: number,
    /**Indicates what the error is*/
    statusMessage: string | null
}

/**
 * Body data of an error.
 */
interface Error {
    /**Error code received if the a command request fails. This value is always less than 0*/
    statusCode: number,
    /**Indicates what the error is*/
    statusMessage: string
}

/**
 * Body data of an event.
 * This body is received from the client after an event that has been subscribed to occurs. 
 */
interface Event {
    /**Event that just occured */
    eventName: APIEvent,
    /**Measurements taken from the event
     * 
     * @todo Add better typings
    */
    measurements: EventMeasurements
}

interface EventMeasurements {
    count: number | null,
    recordCnt: number | null,
    seqMax: number | null,
    seqMin: number | null,
    MetersTravelled: number | null,
    NewBiome: number | null,
    PosAvgX: number | null,
    PosAvgY: number | null,
    PosAvgZ: number | null
}

interface Subscribe {
    eventName: APIEvent
}

interface Unsubscribe {
    eventName: APIEvent
}



