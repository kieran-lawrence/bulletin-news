import { Publisher } from '../../util/typeorm'
import { PaginationParams } from '../../util/types'

export interface IPublisherService {
    findAll(params?: PaginationParams): Promise<Publisher[]>
    findById(id: number): Promise<Publisher>
}
