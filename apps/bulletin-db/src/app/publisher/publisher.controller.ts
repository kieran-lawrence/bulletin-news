import { Controller, Get, Param } from '@nestjs/common'
import { Routes } from '../../util/constants'

@Controller(Routes.PUBLISHER)
export class PublisherController {
    @Get()
    findAll(): string {
        return 'Return all publishers'
    }
    @Get(':id')
    findById(@Param() params: GetPublisherByIdParams): string {
        return `Return publisher with id of: ${params.id}`
    }
}

interface GetPublisherByIdParams {
    id: string
}
