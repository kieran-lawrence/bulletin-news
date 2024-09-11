import { Injectable } from '@nestjs/common'
import { IPublisherService } from './publisher'
import { Publisher } from '../../util/typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PaginationParams, Publisher as PublisherType } from '../../util/types'
import { calculateSkip } from '../article/article.service'

@Injectable()
export class PublisherService implements IPublisherService {
    constructor(
        @InjectRepository(Publisher)
        private publisherRepository: Repository<Publisher>,
    ) {}
    findAll({ page_size, page = 1 }: PaginationParams): Promise<Publisher[]> {
        return this.publisherRepository.find({
            cache: true,
            take: page_size,
            skip: calculateSkip(page, page_size),
            order: {
                id: 'DESC',
            },
        })
    }
    findById(id: number): Promise<Publisher> {
        return this.publisherRepository.findOne({
            where: {
                id,
            },
            cache: true,
        })
    }
    async insertPublisher(publisher: PublisherType) {
        const savedPublisher = await this.publisherRepository.create(publisher)
        return this.publisherRepository.save(savedPublisher)
    }
}
