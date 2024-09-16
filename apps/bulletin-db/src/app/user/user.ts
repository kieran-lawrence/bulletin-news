import { CreateUserParams } from '../../util/types'
import { User as UserEntity } from '../../util/typeorm'
export interface IUserService {
    insertUser(user: CreateUserParams)
    findByEmail(email: string): Promise<UserEntity | undefined>
    validateUser(email: string): Promise<UserEntity | undefined>
}
