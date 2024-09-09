import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Publisher {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    handle: string

    @Column()
    name: string

    @Column()
    description: string

    @Column({ nullable: true })
    logoUrl: string

    @Column()
    category: string
}
