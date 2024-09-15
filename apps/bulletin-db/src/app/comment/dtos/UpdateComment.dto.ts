import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { CommentStatus } from '../../../util/types'
export class UpdateCommentDto {
    @IsNumber()
    @IsNotEmpty()
    id: number

    @IsString()
    @IsOptional()
    text: string

    @IsString()
    @IsOptional()
    status: CommentStatus
}
