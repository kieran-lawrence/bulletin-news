import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common'
import { Routes, Services } from '../../util/constants'
import { IPublisherService } from './publisher'

@Controller(Routes.PUBLISHER)
export class PublisherController {
    constructor(
        @Inject(Services.PUBLISHER)
        private readonly publisherService: IPublisherService,
    ) {}
    @Get()
    findAll() {
        return this.publisherService.findAll()
    }
    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.publisherService.findById(id)
    }
}
