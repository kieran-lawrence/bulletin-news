import { Comment as CommentEntity } from '../../util/typeorm'
import {
    PaginationParams,
    FindCommentsByStatusParams,
    CreateCommentParams,
    UpdateCommentParams,
    FindCommentsByArticleIdParams,
    CreateCommentReplyParams,
} from '../../util/types'

export interface ICommentService {
    findAll(params?: PaginationParams): Promise<CommentEntity[]>
    findById(id: number): Promise<CommentEntity>
    findByArticleId(
        params: FindCommentsByArticleIdParams,
    ): Promise<CommentEntity[]>
    findByStatus(params: FindCommentsByStatusParams): Promise<CommentEntity[]>
    createComment(comment: CreateCommentParams): Promise<CommentEntity>
    updateComment(params: UpdateCommentParams): Promise<CommentEntity>
    createReply(reply: CreateCommentReplyParams): Promise<CommentEntity>
}
