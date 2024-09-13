import { IsString, IsOptional } from 'class-validator'
export class PaginationQueryParamsDto {
    @IsString()
    @IsOptional()
    page: string

    @IsString()
    @IsOptional()
    page_size: string
}
