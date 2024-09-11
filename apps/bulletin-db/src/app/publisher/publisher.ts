import { Publisher as PublisherEntity } from '../../util/typeorm'
import { PaginationParams, Publisher } from '../../util/types'
export interface IPublisherService {
    findAll(params?: PaginationParams): Promise<PublisherEntity[]>
    findById(id: number): Promise<PublisherEntity>
    insertPublisher(publisher: Publisher)
}
