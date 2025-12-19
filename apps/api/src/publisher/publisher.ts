import { PublisherEntity, PaginationParams, Publisher } from '@repo/api'

export interface IPublisherService {
    findAll(params?: PaginationParams): Promise<PublisherEntity[]>
    findById(id: number): Promise<PublisherEntity>
    insertPublisher(publisher: Publisher)
}
