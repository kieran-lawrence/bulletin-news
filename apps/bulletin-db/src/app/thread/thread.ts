import { Thread, ThreadParticipant, User } from '../../util/typeorm'

export interface IThreadService {
    createThread(): Promise<Thread>
    addThreadParticipant(thread: Thread, user: User): Promise<ThreadParticipant>
    getThreadParticipants(threadId: number): Promise<ThreadParticipant>
    getThreadById(id: number): Promise<Thread>
}
