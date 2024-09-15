import {
    ConflictException,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { IUserService } from '../user/user'
import { Services } from '../../util/constants'
import { JwtService } from '@nestjs/jwt'
import { CreateUserParams, User } from '../../util/types'

@Injectable()
export class AuthService {
    constructor(
        @Inject(Services.USER) private readonly userService: IUserService,
        private jwtService: JwtService,
    ) {}

    async signIn(
        email: string,
        pass: string,
    ): Promise<{ access_token: string }> {
        const user = await this.userService.findByEmail(email)
        if (!user || user.password !== pass) {
            throw new UnauthorizedException(
                'Username or password is incorrect.',
            )
        }
        const payload = { sub: user.id, email: user.email }
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }

    async register(user: CreateUserParams): Promise<User> {
        const userExists = await this.userService.findByEmail(user.email)
        if (userExists) {
            throw new ConflictException(
                'A user with this email address already exists.',
            )
        }
        return this.userService.insertUser(user)
    }

    async getAccount(email: string): Promise<User> {
        return this.userService.findByEmail(email)
    }
}
