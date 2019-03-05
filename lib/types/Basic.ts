export type MemberId = string
export type Term = BigInt
export type LogIndex = BigInt
export type Message = string
export interface Entry {
    term: Term,
    message: Message
}
export type ClientId = string