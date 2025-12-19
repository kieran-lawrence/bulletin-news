import {
    CreateUserParams,
    ValidateUserCredentialsParams,
    UserEntity,
} from '@repo/api'

export interface IUserService {
    insertUser(user: CreateUserParams)
    findByEmail(email: string): Promise<UserEntity | undefined>
    validateUser(
        params: ValidateUserCredentialsParams,
    ): Promise<Partial<UserEntity> | undefined>
}
