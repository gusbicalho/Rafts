import { ClientId, Message, MemberId, LogIndex, Entry } from "./Basic";

export interface ProduceMessageRequest {
    type: 'Event/ProduceMessageRequest'
    clientId: ClientId
    message: Message
}

export interface ProduceMessageAcceptedResponse {
    type: 'Effect/ProduceMessageAcceptedResponse'
    clientId: ClientId
}

export interface ProduceMessageRejectedResponse {
    type: 'Effect/ProduceMessageAcceptedResponse'
    clientId: ClientId
    leaderId: MemberId
}

export interface GetFromRequest {
    type: 'Event/GetFromRequest'
    clientId: ClientId
    from: LogIndex
    count: BigInt
}

export interface GetFromResponse {
    type: 'Effect/GetFromResponse'
    clientId: ClientId
    entries: Entry[]
}

export interface GetLatestRequest {
    type: 'Event/GetLatestRequest'
    clientId: ClientId
}

export interface GetLatestResponse {
    type: 'Effect/GetLatestResponse'
    clientId: ClientId
    entry: Entry
}

export type ClientEffect =
    | ProduceMessageAcceptedResponse
    | ProduceMessageRejectedResponse
    | GetFromResponse
    | GetLatestResponse

export type ClientEvent =
    | ProduceMessageRequest
    | GetFromRequest
    | GetLatestRequest
