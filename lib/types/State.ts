import { Term, MemberId, Entry, LogIndex } from "./Basic";
import { NanoTime } from "../util/Clock";

export type LeadershipStatus =
    | 'follower'
    | 'candidate'
    | 'leader'

export interface PersistentState {
    pendingStorage: boolean
    currentTerm: Term
    votedFor: null | MemberId
    log: Entry[]
}

export interface Configuration {
    selfId: MemberId
    memberIds: MemberId[]
}

export interface CommonState {
    persistent: PersistentState
    commitIndex: LogIndex
    lastApplied: LogIndex
    configuration: Configuration
    electionTimeoutStart: NanoTime
}

export interface FollowerState extends CommonState {
    leadershipStatus: 'follower'
}

export interface CandidateState extends CommonState {
    leadershipStatus: 'candidate'
    votesGranted: Set<MemberId>
}

export interface LeaderState extends CommonState {
    leadershipStatus: 'leader'
    nextIndex: Map<MemberId, LogIndex>
    matchIndex: Map<MemberId, LogIndex>
}