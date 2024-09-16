import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { IUserService } from './user'
import { User } from '../../util/typeorm'
import {
    CreateUserParams,
    ValidateUserCredentialsParams,
} from '../../util/types'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { compareHash, hashPassword } from '../../util/helpers'

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
    async insertUser(user: CreateUserParams): Promise<User> {
        const userExists = await this.findByEmail(user.email)
        if (userExists) {
            throw new ConflictException(
                'A user with this email address already exists.',
            )
        }
        const password = await hashPassword(user.password)
        const newUser = await this.userRepository.create({ ...user, password })
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
    async validateUser({
        email,
        password,
    }: ValidateUserCredentialsParams): Promise<Partial<User> | undefined> {
        const user = await this.userRepository.findOne({
            where: {
                email,
            },
            select: {
                id: true,
                email: true,
                password: true,
            },
        })
        if (!user)
            throw new UnauthorizedException('Username or password is incorrect')
        const passwordsMatch = await compareHash(password, user.password)
        if (!passwordsMatch)
            throw new UnauthorizedException('Username or password is incorrect')

        return passwordsMatch ? { id: user.id, email: user.email } : undefined
    }
}
