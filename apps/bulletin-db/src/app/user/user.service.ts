import { Injectable } from '@nestjs/common'
import { IUserService } from './user'
import { User } from '../../util/typeorm'
import { CreateUserParams } from '../../util/types'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
    async insertUser(user: CreateUserParams): Promise<User> {
        const newUser = await this.userRepository.create(user)
        return this.userRepository.save(newUser)
    }
    findByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: {
                email,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                dateOfBirth: true,
            },
            cache: true,
        })
    }
}
