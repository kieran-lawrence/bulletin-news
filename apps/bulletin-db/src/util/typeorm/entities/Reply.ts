import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'
import { Comment } from './Comment'
import { CommentStatus } from '../../types'

@Entity({ name: 'reply' })
export class CommentReply {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @CreateDateColumn()
    publishedAt: number

    @ManyToOne(() => Comment, (comment) => comment.id)
    comment: Comment

    @OneToOne(() => User, (user) => user.id)
    @JoinColumn()
    author: User

    @Column('text')
    status: CommentStatus
}
