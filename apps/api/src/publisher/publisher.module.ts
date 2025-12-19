import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { PublisherController } from './publisher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublisherEntity } from '@repo/api';
import { Services } from '../util/constants';

@Module({
  imports: [TypeOrmModule.forFeature([PublisherEntity])],
  providers: [
    {
      provide: Services.PUBLISHER,
      useClass: PublisherService,
    },
  ],
  exports: [
    {
      provide: Services.PUBLISHER,
      useClass: PublisherService,
    },
  ],
  controllers: [PublisherController],
})
export class PublisherModule {}
