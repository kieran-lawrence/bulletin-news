import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Thread {
    @PrimaryGeneratedColumn()
    id: number
}
