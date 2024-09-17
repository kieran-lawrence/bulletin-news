import { Module } from '@nestjs/common'
import { ArticleModule } from './article/article.module'
import { PublisherModule } from './publisher/publisher.module'
import { CommentModule } from './comment/comment.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import entities from '../util/typeorm'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThreadModule } from './thread/thread.module';
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        ArticleModule,
        PublisherModule,
        CommentModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities,
            synchronize: true,
            cache: true,
        }),
        UserModule,
        AuthModule,
        ThreadModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
