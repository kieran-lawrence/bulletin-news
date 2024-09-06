import { Module } from '@nestjs/common'
import { ArticleModule } from './article/article.module'
import { PublisherModule } from './publisher/publisher.module'
import { CommentModule } from './comment/comment.module';

@Module({
    imports: [ArticleModule, PublisherModule, CommentModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
