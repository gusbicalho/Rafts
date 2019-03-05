import { ClientId, Message, MemberId } from "./Basic";

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
