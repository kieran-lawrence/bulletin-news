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
import { calculateSkip } from '../../util/helpers'

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

    // Used when browsing to a specific article page
    findById(id: number): Promise<Article> {
        return this.articleRepository
            .createQueryBuilder('article')
            .where('article.id = :id', { id })
            .leftJoinAndSelect('article.publisher', 'publisher')
            .leftJoinAndSelect(
                'article.comments',
                'comments',
                'comments.status = :status',
                {
                    status: 'live',
                },
            )
            .getOne()
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
