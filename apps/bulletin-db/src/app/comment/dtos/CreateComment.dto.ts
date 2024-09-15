import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    text: string

    @IsNotEmpty()
    @IsString()
    publishedAt: string

    @IsNumber()
    @IsNotEmpty()
    articleId: number
}
