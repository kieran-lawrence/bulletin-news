import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm'
import { Publisher } from './Publisher'
import { Comment } from './Comment'
import { ArticleSection } from '../../types'

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    author: string

    @Column()
    title: string

    @Column()
    category: string

    @Column()
    readTime: number

    @Column()
    urlToImage: string

    @Column()
    publishedAt: string

    @Column('text', { array: true, nullable: true })
    flags: string[]

    @Column('jsonb', { nullable: true })
    articleSections: ArticleSection[]

    @ManyToOne(() => Publisher, (publisher) => publisher.id)
    publisher: Publisher

    @OneToMany(() => Comment, (comment) => comment.article)
    @JoinColumn()
    comments: Comment
}
