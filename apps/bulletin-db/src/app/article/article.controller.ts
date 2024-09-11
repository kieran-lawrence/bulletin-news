import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common'
import { IArticleService } from './article'
import { Article as ArticleType } from '../../util/types'
import { Routes, Services } from '../../util/constants'
import { PaginationQueryParamsDto } from './dtos/PaginationQueryParams'

@Controller(Routes.ARTICLE)
export class ArticleController {
    constructor(
        @Inject(Services.ARTICLE)
        private readonly articleService: IArticleService,
    ) {}
    @Get()
    findAll(@Query() { page = 1, page_size = 10 }: PaginationQueryParamsDto) {
        return this.articleService.findAll({ page, page_size })
    }
    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.articleService.findById(id)
    }
    @Get('category/:category')
    findByCategory(
        @Param('category') category: string,
        @Query() { page = 1, page_size = 10 }: PaginationQueryParamsDto,
    ) {
        return this.articleService.findByCategory({ category, page, page_size })
    }
    @Get('flag/:flag')
    findByTag(
        @Param('flag') flag: string,
        @Query() { page = 1, page_size = 10 }: PaginationQueryParamsDto,
    ) {
        return this.articleService.findByFlag({ flag, page, page_size })
    }

    @Post()
    createArticle(@Body() article: ArticleType) {
        return this.articleService.insertArticle(article)
    }
}
