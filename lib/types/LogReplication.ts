import { Term, MemberId, LogIndex, Entry } from "./Basic";

export interface AppendEntriesRPC {
    type: 'Effect/AppendEntriesRPC'
    followerId: MemberId
    payload: {
        leaderId: MemberId
        term: Term
        prevLogIndex: LogIndex
        prevLogTerm: Term
        entries: Entry
        leaderCommit: LogIndex
    }
}

export interface AppendEntriesRequest {
    type: 'Event/AppendEntriesRequest'
    leaderId: MemberId
    term: Term
    prevLogIndex: LogIndex
    prevLogTerm: Term
    entries: Entry
    leaderCommit: LogIndex
}

export interface AppendEntriesTimeout {
    type: 'Event/AppendEntriesRequest'
    leaderId: MemberId
    term: Term
    prevLogIndex: LogIndex
    prevLogTerm: Term
    entries: Entry
    leaderCommit: LogIndex
}

export interface AppendEntriesResponse {
    type: 'Event/AppendEntriesResponse'
    term: Term
    success: boolean
}

export type LogReplicationEffect =
    | AppendEntriesRPC

export type LogReplicationEvent =
    | AppendEntriesRequest
    | AppendEntriesResponse
