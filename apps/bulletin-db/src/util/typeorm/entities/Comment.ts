import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'
import { Article } from './Article'

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @CreateDateColumn()
    publishedAt: number

    @ManyToOne(() => User, (user) => user.id)
    user: User

    @ManyToOne(() => Article, (article) => article.id)
    article: Article
}
