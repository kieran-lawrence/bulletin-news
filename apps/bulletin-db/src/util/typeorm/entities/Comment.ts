import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'
import { Article } from './Article'
import { CommentStatus } from '../../types'
import { Thread } from './Thread'

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @CreateDateColumn()
    publishedAt: string

    @ManyToOne(() => User, (user) => user.id)
    user: User

    @ManyToOne(() => Article, (article) => article.comments)
    article: Article

    @Column('text', { default: CommentStatus.LIVE })
    status: CommentStatus

    @ManyToOne(() => Thread, (thread) => thread.id)
    thread: Thread
}
