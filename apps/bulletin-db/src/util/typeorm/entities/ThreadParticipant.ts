import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'
import { Thread } from './Thread'

@Entity({ name: 'thread_participant' })
export class ThreadParticipant {
    @PrimaryGeneratedColumn({ name: 'thread_participant_id' })
    id: number

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    user: User

    @ManyToOne(() => Thread, (thread) => thread.id)
    @JoinColumn()
    thread: Thread
}
