import { Article as ArticleEntity } from '../../util/typeorm/entities/Article'
import {
    Article,
    FindArticleByCategoryParams,
    FindArticleByFlagParams,
    PaginationParams,
} from '../../util/types'

export interface IArticleService {
    findAll(params?: PaginationParams): Promise<ArticleEntity[]>
    findById(id: number): Promise<ArticleEntity>
    findByCategory(
        params: FindArticleByCategoryParams,
    ): Promise<ArticleEntity[]>
    findByFlag(params: FindArticleByFlagParams): Promise<ArticleEntity[]>
    insertArticle(article: Article)
}
