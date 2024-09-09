import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Article } from '../../util/typeorm/entities/Article'
import { Repository } from 'typeorm'
import { IArticleService } from './article'
import { ArrayContains } from 'typeorm'
import { Article as TypeArticle } from '../../util/types'

@Injectable()
export class ArticleService implements IArticleService {
    constructor(
        @InjectRepository(Article)
        private articleRepository: Repository<Article>,
    ) {}

    findAll(): Promise<Article[]> {
        return this.articleRepository.find({
            cache: true,
            relations: {
                publisher: true,
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
