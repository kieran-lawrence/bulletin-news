import { ArticleSection } from 'apps/bulletin-db/src/util/types'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateArticleDto {
    @IsString()
    @IsNotEmpty()
    author: string

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    category: string

    @IsNumber()
    @IsNotEmpty()
    readTime: number

    @IsString()
    @IsNotEmpty()
    urlToImage: string

    @IsString()
    @IsNotEmpty()
    publishedAt: string

    @IsNotEmpty()
    flags: string[]

    @IsNotEmpty()
    articleSections: ArticleSection[]

    @IsNumber()
    @IsNotEmpty()
    publisherId: number
}
