import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../../types';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  dateOfBirth: string;

  @Column()
  password: string;

  @Column('text', { default: 'user' })
  role: UserRole;
}
