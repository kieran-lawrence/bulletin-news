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
import { FindAllArticlesDto } from './dtos/FindAll.dto'

@Controller(Routes.ARTICLE)
export class ArticleController {
    constructor(
        @Inject(Services.ARTICLE)
        private readonly articleService: IArticleService,
    ) {}
    @Get()
    findAll(@Query() params?: FindAllArticlesDto) {
        return this.articleService.findAll(params)
    }
    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.articleService.findById(id)
    }
    @Get('category/:category')
    findByCategory(@Param('category') category: string) {
        return this.articleService.findByCategory(category)
    }
    @Get('flag/:flag')
    findByTag(@Param('flag') flag: string) {
        return this.articleService.findByFlag(flag)
    }

    @Post()
    createArticle(@Body() article: ArticleType) {
        return this.articleService.insertArticle(article)
    }
}
// app.get('/articles', (req, res) => {
// 	res.send(articles);
// });
// app.get('/articles/:id', (req, res) => {
// 	const { id } = req.params;
// 	const article = articles.find((a) => a.id === parseInt(id));
// 	res.send(article);
// });
// app.get('/articles/categories/:category', (req, res) => {
// 	const { category } = req.params;
// 	const article = articles.filter((article) => article.category.toLowerCase() === category.toLowerCase());
// 	res.send(article);
// });
// app.get('/articles-must-read', (req, res) => {
// 	const mustRead = articles.filter((article) => article.flags.find((f) => f === 'must-read'));
// 	res.send(mustRead);
// });
