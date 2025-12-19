import { Module } from '@nestjs/common'
import { ArticleModule } from './article/article.module'
import { PublisherModule } from './publisher/publisher.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { ArticleEntity, PublisherEntity, UserEntity } from '@repo/api'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        ArticleModule,
        PublisherModule,
        UserModule,
        AuthModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [ArticleEntity, PublisherEntity, UserEntity],
            synchronize: true,
            cache: true,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
