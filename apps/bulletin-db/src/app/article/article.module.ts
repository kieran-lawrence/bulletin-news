import { Module } from '@nestjs/common'
import { ArticleService } from './article.service'
import { ArticleController } from './article.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Article } from '../../util/typeorm'
import { Services } from '../../util/constants'

@Module({
    imports: [TypeOrmModule.forFeature([Article])],
    providers: [
        {
            provide: Services.ARTICLE,
            useClass: ArticleService,
        },
    ],
    controllers: [ArticleController],
    exports: [
        {
            provide: Services.ARTICLE,
            useClass: ArticleService,
        },
    ],
})
export class ArticleModule {}
