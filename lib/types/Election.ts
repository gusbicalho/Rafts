import { MemberId, Term, LogIndex } from "./Basic";

export interface ElectionTimeout {
    type: 'Event/ElectionTimeout'
}

export interface HeartbeatTrigger {
    type: 'Event/HeartbeatTrigger'
}

export interface RequestVoteRPC {
    type: 'Effect/RequestVoteRPC'
    voterId: MemberId
    payload: {
        term: Term
        candidateId: MemberId
        lastLogIndex: LogIndex
        lastLogTerm: Term
    }
}

export interface RequestVoteRequest {
    type: 'Event/RequestVoteRequest'
    term: Term
    candidateId: MemberId
    lastLogIndex: LogIndex
    lastLogTerm: Term
}

export interface RequestVoteTimeout {
    type: 'Event/RequestVoteRequest'
    term: Term
    candidateId: MemberId
    lastLogIndex: LogIndex
    lastLogTerm: Term
}

export interface RequestVoteResponse {
    type: 'Event/RequestVoteResponse'
    voterId: MemberId
    term: Term
    voteGranted: boolean
}

export type ElectionEffect =
    | RequestVoteRPC

export type ElectionEvent =
    | RequestVoteRequest
    | RequestVoteResponse
    | ElectionTimeout
    | HeartbeatTrigger
