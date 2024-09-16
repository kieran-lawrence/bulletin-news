import {
    CreateUserParams,
    ValidateUserCredentialsParams,
} from '../../util/types'
import { User as UserEntity } from '../../util/typeorm'
export interface IUserService {
    insertUser(user: CreateUserParams)
    findByEmail(email: string): Promise<UserEntity | undefined>
    validateUser(
        params: ValidateUserCredentialsParams,
    ): Promise<Partial<UserEntity> | undefined>
}
