import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common'
import { Routes, Services } from '../../util/constants'
import { IPublisherService } from './publisher'
import { PaginationQueryParamsDto } from '../../util/dtos/PaginationQueryParams'
import { Publisher as PublisherType } from '../../util/types'
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
    @Post()
    createPublisher(@Body() publisher: PublisherType) {
        return this.publisherService.insertPublisher(publisher)
    }
}
