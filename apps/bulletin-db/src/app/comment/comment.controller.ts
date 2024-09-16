import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common'
import { ICommentService } from './comment'
import { Routes, Services } from '../../util/constants'
import { CreateCommentDto } from './dtos/CreateComment.dto'
import { AuthGuard } from '../auth/guards/auth.guard'
import { PaginationQueryParamsDto } from '../../util/dtos/PaginationQueryParams'
import { UpdateCommentDto } from './dtos/UpdateComment.dto'
import { Request } from '@nestjs/common'

@Controller(Routes.COMMENT)
export class CommentController {
    constructor(
        @Inject(Services.COMMENT) private commentService: ICommentService,
    ) {}

    @Get()
    findAll(
        @Query() { page = '1', page_size = '10' }: PaginationQueryParamsDto,
    ) {
        return this.commentService.findAll({
            page: parseInt(page),
            page_size: parseInt(page_size),
        })
    }
    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.commentService.findById(id)
    }
    @Get('article/:id')
    findByArticleId(
        @Query() { page = '1', page_size = '10' }: PaginationQueryParamsDto,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.commentService.findByArticleId({
            page: parseInt(page),
            page_size: parseInt(page_size),
            articleId: id,
        })
    }

    @Post()
    @UseGuards(AuthGuard)
    insertComment(@Request() req, @Body() comment: CreateCommentDto) {
        return this.commentService.insertComment({
            ...comment,
            userEmail: req.user.email, // Extract user from JWT for comment author
        })
    }

    @Patch()
    @UseGuards(AuthGuard)
    updateComment(@Request() req, @Body() comment: UpdateCommentDto) {
        return this.commentService.updateComment({
            ...comment,
            userEmail: req.user.email, // Extract user from JWT for comment author
        })
    }
}
