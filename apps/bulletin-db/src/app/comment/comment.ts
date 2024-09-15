import { Comment as CommentEntity } from '../../util/typeorm'
import {
    Comment,
    PaginationParams,
    FindCommentsByStatusParams,
    CreateCommentParams,
    UpdateCommentParams,
} from '../../util/types'

export interface ICommentService {
    findAll(params?: PaginationParams): Promise<CommentEntity[]>
    findById(id: number): Promise<CommentEntity>
    findByStatus(params: FindCommentsByStatusParams): Promise<CommentEntity[]>
    insertComment(comment: CreateCommentParams): Promise<CommentEntity>
    updateComment(params: UpdateCommentParams): Promise<CommentEntity>
}
