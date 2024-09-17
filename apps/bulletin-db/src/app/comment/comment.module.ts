import { Module } from '@nestjs/common'
import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comment } from '../../util/typeorm'
import { Services } from '../../util/constants'
import { UserModule } from '../user/user.module'
import { ArticleModule } from '../article/article.module'
import { ThreadModule } from '../thread/thread.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([Comment]),
        UserModule,
        ArticleModule,
        ThreadModule,
    ],
    controllers: [CommentController],
    providers: [
        {
            provide: Services.COMMENT,
            useClass: CommentService,
        },
    ],
})
export class CommentModule {}
