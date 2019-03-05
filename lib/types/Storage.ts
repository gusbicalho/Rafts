import { Term, MemberId, LogIndex, Entry } from "./Basic";

export type StorageCallId = BigInt

export interface PersistVoteCall {
    type: 'Effect/PersistVoteCall'
    callId: StorageCallId
    currentTerm: Term
    votedFor: MemberId
}

export interface PersistVoteReturn {
    type: 'Event/PersistVoteReturn'
    callId: StorageCallId
    currentTerm: Term
    votedFor: MemberId
    error?: any
}

export interface AppendEntriesCall {
    type: 'Effect/AppendEntriesCall'
    callId: StorageCallId
    prevLogIndex: LogIndex
    finalLogIndex: LogIndex
    entries: Entry[]
}

export interface AppendEntriesReturn {
    type: 'Event/AppendEntriesReturn'
    callId: StorageCallId
    prevLogIndex: LogIndex
    finalLogIndex: LogIndex
    error?: any
}

export type StorageEffect =
    | PersistVoteCall
    | AppendEntriesCall

export type StorageEvent =
    | PersistVoteReturn
    | AppendEntriesReturn