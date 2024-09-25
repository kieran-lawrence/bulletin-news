import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Article } from '../../util/typeorm/entities/Article'
import { Repository } from 'typeorm'
import { IArticleService } from './article'
import { ArrayContains } from 'typeorm'
import {
    CreateArticleParams,
    FindArticleByCategoryParams,
    FindArticleByFlagParams,
    PaginationParams,
    Article as TypeArticle,
} from '../../util/types'
import { calculateSkip } from '../../util/helpers'
import { Services } from '../../util/constants'
import { IPublisherService } from '../publisher/publisher'

@Injectable()
export class ArticleService implements IArticleService {
    constructor(
        @InjectRepository(Article)
        private articleRepository: Repository<Article>,
        @Inject(Services.PUBLISHER)
        private readonly publisherService: IPublisherService,
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
    async createArticle(article: CreateArticleParams) {
        const savedArticle = await this.articleRepository.create(article)

        // Find the publisher to attach to the article
        const publisher = await this.publisherService.findById(
            article.publisherId,
        )
        savedArticle.publisher = publisher
        return this.articleRepository.save(savedArticle)
    }
}
