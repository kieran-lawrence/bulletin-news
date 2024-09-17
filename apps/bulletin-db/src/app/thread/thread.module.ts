import { Module } from '@nestjs/common'
import { ThreadService } from './thread.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Thread, ThreadParticipant } from '../../util/typeorm'
import { Services } from '../../util/constants'

@Module({
    imports: [TypeOrmModule.forFeature([Thread, ThreadParticipant])],
    providers: [
        {
            provide: Services.THREAD,
            useClass: ThreadService,
        },
    ],
    exports: [
        {
            provide: Services.THREAD,
            useClass: ThreadService,
        },
    ],
})
export class ThreadModule {}
