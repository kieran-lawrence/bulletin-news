import { Article as ArticleEntity } from '../../util/typeorm/entities/Article'
import { Article, FindArticleParams } from '../../util/types'

export interface IArticleService {
    findAll(params?: FindArticleParams): Promise<ArticleEntity[]>
    findById(id: number): Promise<ArticleEntity>
    findByCategory(category: string): Promise<ArticleEntity[]>
    findByFlag(flag: string): Promise<ArticleEntity[]>
    insertArticle(article: Article)
}
