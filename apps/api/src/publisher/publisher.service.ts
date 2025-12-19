import { Injectable } from '@nestjs/common';
import { IPublisherService } from './publisher';
import { PublisherEntity, PaginationParams, Publisher } from '@repo/api';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { calculateSkip } from '../util/helpers';

@Injectable()
export class PublisherService implements IPublisherService {
  constructor(
    @InjectRepository(PublisherEntity)
    private publisherRepository: Repository<PublisherEntity>,
  ) {}
  findAll({
    page_size,
    page = 1,
  }: PaginationParams): Promise<PublisherEntity[]> {
    return this.publisherRepository.find({
      cache: true,
      take: page_size,
      skip: calculateSkip(page, page_size),
      order: {
        id: 'DESC',
      },
    });
  }
  findById(id: number): Promise<PublisherEntity> {
    return this.publisherRepository.findOne({
      where: {
        id,
      },
      cache: true,
    });
  }
  async insertPublisher(publisher: Publisher) {
    const savedPublisher = await this.publisherRepository.create(publisher);
    return this.publisherRepository.save(savedPublisher);
  }
}
