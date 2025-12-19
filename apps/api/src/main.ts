import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const globalPrefix = 'api'
    app.setGlobalPrefix(globalPrefix)
    app.useGlobalPipes(new ValidationPipe())
    app.enableCors({ origin: [`http://localhost:3000`], credentials: true })
    const PORT = process.env.API_PORT || 3001
    await app.listen(PORT)
    Logger.log(
        `🚀 Bulletin [API] is running on: http://localhost:${PORT}/${globalPrefix}`,
    )
}

void bootstrap()
