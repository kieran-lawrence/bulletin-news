import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateCommentReplyDto {
    @IsString()
    @IsNotEmpty()
    text: string

    @IsNotEmpty()
    @IsString()
    publishedAt: string

    @IsNumber()
    @IsNotEmpty()
    articleId: number

    @IsNumber()
    @IsNotEmpty()
    threadId: number
}
