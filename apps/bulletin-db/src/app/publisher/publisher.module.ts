import { Module } from '@nestjs/common'
import { PublisherService } from './publisher.service'
import { PublisherController } from './publisher.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Publisher } from '../../util/typeorm'
import { Services } from '../../util/constants'

@Module({
    imports: [TypeOrmModule.forFeature([Publisher])],
    providers: [
        {
            provide: Services.PUBLISHER,
            useClass: PublisherService,
        },
    ],
    controllers: [PublisherController],
})
export class PublisherModule {}
