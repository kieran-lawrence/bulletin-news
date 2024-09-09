import { Article as ArticleEntity } from '../../util/typeorm/entities/Article'
import { Article } from '../../util/types'

export interface IArticleService {
    findAll(): Promise<ArticleEntity[]>
    findById(id: number): Promise<ArticleEntity>
    findByCategory(category: string): Promise<ArticleEntity[]>
    findByFlag(flag: string): Promise<ArticleEntity[]>
    insertArticle(article: Article)
}
