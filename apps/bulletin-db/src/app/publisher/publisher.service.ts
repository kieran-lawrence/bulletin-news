import { Injectable } from '@nestjs/common'
import { IPublisherService } from './publisher'
import { Publisher } from '../../util/typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class PublisherService implements IPublisherService {
    constructor(
        @InjectRepository(Publisher)
        private publisherRepository: Repository<Publisher>,
    ) {}
    findAll(): Promise<Publisher[]> {
        return this.publisherRepository.find({
            cache: true,
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
}
