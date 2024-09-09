import { Publisher } from '../../util/typeorm'

export interface IPublisherService {
    findAll(): Promise<Publisher[]>
    findById(id: number): Promise<Publisher>
}
