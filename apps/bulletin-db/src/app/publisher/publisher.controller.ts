import {
    Controller,
    Get,
    Inject,
    Param,
    ParseIntPipe,
    Query,
} from '@nestjs/common'
import { Routes, Services } from '../../util/constants'
import { IPublisherService } from './publisher'
import { PaginationQueryParamsDto } from '../../util/dtos/PaginationQueryParams'

@Controller(Routes.PUBLISHER)
export class PublisherController {
    constructor(
        @Inject(Services.PUBLISHER)
        private readonly publisherService: IPublisherService,
    ) {}
    @Get()
    findAll(@Query() { page = 1, page_size = 10 }: PaginationQueryParamsDto) {
        return this.publisherService.findAll({ page, page_size })
    }
    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.publisherService.findById(id)
    }
}
