import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { ArticleSection } from '../../types'
import { PublisherEntity } from '../../publisher/entities/publisher.entity'

@Entity({ name: 'article' })
export class ArticleEntity {
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

    @ManyToOne(() => PublisherEntity, (publisher) => publisher.id)
    publisher: PublisherEntity
}
