import { IsNumber, IsOptional } from 'class-validator'
export class PaginationQueryParamsDto {
    @IsNumber()
    @IsOptional()
    page: number

    @IsNumber()
    @IsOptional()
    page_size: number
}
