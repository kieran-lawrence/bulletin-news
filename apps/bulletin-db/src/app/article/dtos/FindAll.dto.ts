import { IsNumber, IsOptional } from 'class-validator'
export class FindAllArticlesDto {
    @IsNumber()
    @IsOptional()
    page: number

    @IsNumber()
    @IsOptional()
    page_size: number
}
