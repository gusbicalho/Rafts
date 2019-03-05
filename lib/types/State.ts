export type LeadershipStatus =
    | 'follower'
    | 'candidate'
    | 'leader'

export interface ServerState {
    leadershipStatus: LeadershipStatus
    pendingStorage: boolean
    
}