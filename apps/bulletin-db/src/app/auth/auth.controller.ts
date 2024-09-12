import { Body, Controller, Inject, Post, Res, UseGuards } from '@nestjs/common'
import { Routes, Services } from '../../util/constants'
import { AuthService } from './auth.service'
import { SignInDto } from './dtos/SignIn.dto'
import { AuthGuard } from './guards/auth.guard'
import { Request } from '@nestjs/common'
import { CreateUserDto } from './dtos/CreateUser.dto'
import { Response } from 'express'
@Controller(Routes.AUTH)
export class AuthController {
    constructor(@Inject(Services.AUTH) private authService: AuthService) {}

    @Post('register')
    async userRegister(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto)
        return this.authService.register(createUserDto)
    }

    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto.email, signInDto.password)
    }

    @UseGuards(AuthGuard)
    @Post('status')
    getProfile(@Request() req) {
        return req.user
    }

    @Post('logout')
    @UseGuards(AuthGuard)
    logout(@Res() res: Response) {
        res.send(200)
    }
}
