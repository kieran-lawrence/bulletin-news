import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Article } from '../../util/typeorm/entities/Article'
import { Repository } from 'typeorm'
import { IArticleService } from './article'
import { ArrayContains } from 'typeorm'
import { FindArticleParams, Article as TypeArticle } from '../../util/types'

@Injectable()
export class ArticleService implements IArticleService {
    constructor(
        @InjectRepository(Article)
        private articleRepository: Repository<Article>,
    ) {}

    findAll({ page_size, page = 1 }: FindArticleParams): Promise<Article[]> {
        // Use skip as paging, but only if we're not on the first page
        const skip = page <= 1 ? 0 : (page - 1) * page_size
        return this.articleRepository.find({
            cache: true,
            relations: {
                publisher: true,
            },
            take: page_size,
            skip,
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
    findByCategory(category: string): Promise<Article[]> {
        return this.articleRepository.find({
            where: {
                category,
            },
            relations: {
                publisher: true,
            },
            cache: true,
        })
    }
    findByFlag(flag: string): Promise<Article[]> {
        return this.articleRepository.find({
            where: {
                flags: ArrayContains([flag]),
            },
            relations: {
                publisher: true,
            },
            cache: true,
        })
    }
    async insertArticle(article: TypeArticle) {
        const savedArticle = await this.articleRepository.create(article)
        return this.articleRepository.save(savedArticle)
    }
}
