import { Controller, Get, Param } from '@nestjs/common'

@Controller('comment')
export class CommentController {
    @Get(':id')
    findById(@Param() params: GetCommentByArticleIdProps): string {
        console.log(params)
        return `Return comments with article id of: ${params.id}`
    }
}

interface GetCommentByArticleIdProps {
    id: string
}
