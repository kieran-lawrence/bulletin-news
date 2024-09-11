import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Article } from '../../util/typeorm/entities/Article'
import { Repository } from 'typeorm'
import { IArticleService } from './article'
import { ArrayContains } from 'typeorm'
import {
    FindArticleByCategoryParams,
    FindArticleByFlagParams,
    PaginationParams,
    Article as TypeArticle,
} from '../../util/types'

@Injectable()
export class ArticleService implements IArticleService {
    constructor(
        @InjectRepository(Article)
        private articleRepository: Repository<Article>,
    ) {}

    findAll({ page_size, page = 1 }: PaginationParams): Promise<Article[]> {
        return this.articleRepository.find({
            cache: true,
            relations: {
                publisher: true,
            },
            take: page_size,
            skip: calculateSkip(page, page_size),
            order: {
                id: 'DESC',
            },
        })
    }

    findById(id: number): Promise<Article> {
        return this.articleRepository.findOne({
            where: {
                id,
            },
            relations: {
                publisher: true,
            },
            cache: true,
        })
    }
    findByCategory({
        category,
        page,
        page_size,
    }: FindArticleByCategoryParams): Promise<Article[]> {
        return this.articleRepository.find({
            where: {
                category,
            },
            relations: {
                publisher: true,
            },
            cache: true,
            take: page_size,
            skip: calculateSkip(page, page_size),
            order: {
                id: 'DESC',
            },
        })
    }
    findByFlag({
        flag,
        page,
        page_size,
    }: FindArticleByFlagParams): Promise<Article[]> {
        return this.articleRepository.find({
            where: {
                flags: ArrayContains([flag]),
            },
            relations: {
                publisher: true,
            },
            cache: true,
            take: page_size,
            skip: calculateSkip(page, page_size),
            order: {
                id: 'DESC',
            },
        })
    }
    async insertArticle(article: TypeArticle) {
        const savedArticle = await this.articleRepository.create(article)
        return this.articleRepository.save(savedArticle)
    }
}

/** Finds the offset (current page) by multiplying the desired page by the page size
 */
export const calculateSkip = (page: number, pageSize: number): number => {
    return page <= 1 ? 0 : (page - 1) * pageSize
}
