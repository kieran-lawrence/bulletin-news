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
    FindCommentsByArticleIdParams,
    CreateCommentReplyParams,
} from '../../util/types'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { calculateSkip } from '../../util/helpers'
import { Services } from '../../util/constants'
import { IUserService } from '../user/user'
import { IArticleService } from '../article/article'
import { IThreadService } from '../thread/thread'

@Injectable()
export class CommentService implements ICommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        @Inject(Services.USER) private readonly userService: IUserService,
        @Inject(Services.ARTICLE)
        private readonly articleService: IArticleService,
        @Inject(Services.THREAD) private readonly threadService: IThreadService,
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
    findByArticleId({
        page,
        page_size,
        articleId,
    }: FindCommentsByArticleIdParams): Promise<Comment[]> {
        return this.commentRepository
            .createQueryBuilder('comment')
            .leftJoin('comment.article', 'article')
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.thread', 'thread')
            .addSelect(['article.id'])
            .where('article.id = :id', { id: articleId })
            .take(page_size)
            .skip(calculateSkip(page, page_size))
            .orderBy('thread.id', 'DESC')
            .addOrderBy('comment.publishedAt', 'ASC')
            .getMany()
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
    async createComment(comment: CreateCommentParams) {
        // Create comment entity
        const savedComment = await this.commentRepository.create(comment)

        // Find user to attach to comment entity
        const user = await this.userService.findByEmail(comment.userEmail)
        if (!user) throw new NotFoundException('User not found')
        savedComment.user = user

        // Find article to attach to comment entity
        const article = await this.articleService.findById(comment.articleId)
        if (!article) throw new NotFoundException('Article not found')
        savedComment.article = article

        // Create thread instance
        const thread = await this.threadService.createThread()
        savedComment.thread = thread

        // Add user as a participant to this new thread
        await this.threadService.addThreadParticipant(thread, user)

        // Save the complete entity into the database
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
    async createReply(reply: CreateCommentReplyParams) {
        // Create comment entity
        const savedReply = await this.commentRepository.create(reply)

        // Find user to attach to comment entity
        const user = await this.userService.findByEmail(reply.userEmail)
        if (!user) throw new NotFoundException('User not found')
        savedReply.user = user

        // Find article to attach to comment entity
        const article = await this.articleService.findById(reply.articleId)
        if (!article) throw new NotFoundException('Article not found')
        savedReply.article = article

        // Find thread to attach to comment entity
        const thread = await this.threadService.getThreadById(reply.threadId)
        console.log(thread)
        if (!thread) throw new NotFoundException('Thread not found')
        savedReply.thread = thread

        // Add user as a participant to existing thread
        await this.threadService.addThreadParticipant(thread, user)

        // Save the complete entity into the database
        return this.commentRepository.save(savedReply)
    }
}
