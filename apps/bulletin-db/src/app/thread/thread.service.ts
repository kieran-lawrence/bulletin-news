import { Injectable } from '@nestjs/common'
import { IThreadService } from './thread'
import { Thread, ThreadParticipant, User } from '../../util/typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ThreadService implements IThreadService {
    constructor(
        @InjectRepository(Thread) private threadRepository: Repository<Thread>,
        @InjectRepository(ThreadParticipant)
        private threadParticipantRepository: Repository<ThreadParticipant>,
    ) {}
    async createThread(): Promise<Thread> {
        const thread = await this.threadRepository.create()
        return this.threadRepository.save(thread)
    }
    addThreadParticipant(
        thread: Thread,
        user: User,
    ): Promise<ThreadParticipant> {
        const threadParticipant = this.threadParticipantRepository.create()
        threadParticipant.thread = thread
        threadParticipant.user = user
        return this.threadParticipantRepository.save(threadParticipant)
    }
    async getThreadParticipants(threadId: number): Promise<ThreadParticipant> {
        const thread = await this.getThreadById(threadId)
        return this.threadParticipantRepository.findOne({
            where: {
                thread,
            },
        })
    }
    getThreadById(id: number): Promise<Thread> {
        return this.threadRepository.findOne({
            where: {
                id,
            },
        })
    }
}
