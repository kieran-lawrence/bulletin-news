import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { Services } from '../../util/constants'
import { JwtModule } from '@nestjs/jwt'
import { AuthGuard } from './guards/auth.guard'

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '7d' },
        }),
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: Services.AUTH,
            useClass: AuthService,
        },
        AuthGuard,
    ],
})
export class AuthModule {}
