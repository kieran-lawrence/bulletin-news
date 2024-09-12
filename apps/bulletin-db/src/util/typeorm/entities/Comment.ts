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

    @ManyToOne(() => Article, (article) => article.id)
    article: Article

    @Column('text')
    status: CommentStatus
}
