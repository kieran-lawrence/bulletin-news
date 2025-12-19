import {
    ArticleEntity,
    CreateArticleParams,
    FindArticleByCategoryParams,
    FindArticleByFlagParams,
    PaginationParams,
} from '@repo/api'

export interface IArticleService {
    findAll(params?: PaginationParams): Promise<ArticleEntity[]>
    findById(id: number): Promise<ArticleEntity>
    findByCategory(
        params: FindArticleByCategoryParams,
    ): Promise<ArticleEntity[]>
    findByFlag(params: FindArticleByFlagParams): Promise<ArticleEntity[]>
    createArticle(article: CreateArticleParams)
}
