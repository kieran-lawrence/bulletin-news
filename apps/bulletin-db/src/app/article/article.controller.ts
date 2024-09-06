import { Controller, Get, Param } from '@nestjs/common'

@Controller('article')
export class ArticleController {
    @Get()
    findAll(): string {
        return 'Return all articles'
    }

    @Get(':id')
    findById(@Param() params: GetArticleByIdParams): string {
        return `Return article with id of: ${params.id}`
    }
    @Get('category/:category')
    findByCategory(@Param() params: GetArticleByCategoryParams): string {
        return `Return article with category of: ${params.category}`
    }
    @Get('tag/:tag')
    findMustRead(@Param() params: GetArticleByTag): string {
        return `Return article with tag of: ${params.tag}`
    }
}

interface GetArticleByIdParams {
    id: string
}
interface GetArticleByCategoryParams {
    category: string
}
interface GetArticleByTag {
    tag: string
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
