import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../../util/typeorm'
import { Services } from '../../util/constants'

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        {
            provide: Services.USER,
            useClass: UserService,
        },
    ],
    exports: [
        {
            provide: Services.USER,
            useClass: UserService,
        },
    ],
})
export class UserModule {}
