import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { UserRole } from '../../types'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    dateOfBirth: string

    @Column()
    password: string

    @Column('text', { default: 'user' })
    role: UserRole
}
