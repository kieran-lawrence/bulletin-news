import {
    Inject,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common'
import { ICommentService } from './comment'
import { Comment } from '../../util/typeorm'
import {
    PaginationParams,
    FindCommentsByStatusParams,
    CreateCommentParams,
    CommentStatus,
    UpdateCommentParams,
    UserRole,
} from '../../util/types'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { calculateSkip } from '../../util/helpers'
import { Services } from '../../util/constants'
import { IUserService } from '../user/user'
import { IArticleService } from '../article/article'

@Injectable()
export class CommentService implements ICommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        @Inject(Services.USER) private readonly userService: IUserService,
        @Inject(Services.ARTICLE)
        private readonly articleService: IArticleService,
    ) {}
    findAll({ page, page_size }: PaginationParams): Promise<Comment[]> {
        return this.commentRepository.find({
            where: {
                status: CommentStatus.LIVE,
            },
            cache: true,
            take: page_size,
            skip: calculateSkip(page, page_size),
            order: {
                id: 'DESC',
            },
        })
    }
    findById(id: number): Promise<Comment> {
        return this.commentRepository.findOne({
            where: {
                id,
            },
            cache: true,
        })
    }
    findByStatus({
        status,
        page,
        page_size,
    }: FindCommentsByStatusParams): Promise<Comment[]> {
        return this.commentRepository.find({
            where: {
                status,
            },
            relations: {
                article: true,
            },
            cache: true,
            take: page_size,
            skip: calculateSkip(page, page_size),
            order: {
                id: 'DESC',
            },
        })
    }
    async insertComment(comment: CreateCommentParams) {
        const savedComment = await this.commentRepository.create(comment)
        const user = await this.userService.findByEmail(comment.userEmail)
        if (!user) throw new NotFoundException('User not found')
        savedComment.user = user
        console.log(comment.articleId)
        const article = await this.articleService.findById(comment.articleId)
        if (!article) throw new NotFoundException('Article not found')
        savedComment.article = article
        return this.commentRepository.save(savedComment)
    }
    async updateComment({
        id,
        status,
        text,
        userEmail,
    }: UpdateCommentParams): Promise<Comment> {
        const comment = await this.findById(id)
        if (!comment) throw new NotFoundException('Comment not found')
        const user = await this.userService.findByEmail(userEmail)
        if (!user) throw new NotFoundException('User not found')

        // Check if user is authorized to update comment status
        if (status) {
            if (user.role !== UserRole.USER) {
                comment.status = status
            } else {
                throw new UnauthorizedException(
                    'Users are not authorized to update comment status',
                )
            }
        }

        comment.text = text
        return this.commentRepository.save(comment)
    }
}
