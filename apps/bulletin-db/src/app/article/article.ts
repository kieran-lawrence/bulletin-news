import { Article as ArticleEntity } from '../../util/typeorm/entities/Article'
import {
    CreateArticleParams,
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
    createArticle(article: CreateArticleParams)
}
