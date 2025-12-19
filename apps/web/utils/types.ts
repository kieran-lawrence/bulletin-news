import { type Article, User } from '@repo/api'

// Types originate from https://github.com/kieran-lawrence/comments/blob/main/packages/shared-types/src/index.ts
export type Comment = {
    id: number
    parentId: number | null
    parent: Comment | null
    replies: Comment[]
    content: string
    status: CommentStatus
    likeCount: number
    flaggedCount: number
    createdAt: string
    updatedAt: string
    article: Article
    articleId: number
    author: User
    authorId: number
    likes?: CommentLike[]
    flags?: CommentFlag[]
}

export type CommentLike = {
    id: number
    userId: string
    commentId: number
    createdAt: string
    comment?: Comment
    user?: User
}

export type CommentFlag = {
    id: number
    userId: string
    commentId: number
    createdAt: string
    comment?: Comment
    user?: User
}

export type CommentStatus =
    | 'PENDING' // New comment, awaiting review
    | 'APPROVED' // Approved by a moderator
    | 'REJECTED' // Reviewed and rejected by a moderator
    | 'FLAGGED' // Community flagged, needs review by a moderator

export type CreateCommentDto = {
    content: string
    articleId: number
    authorEmail: string
}

export type CreateCommentReplyDto = {
    commentId: number
    content: string
    articleId: number
    authorEmail: string
}

export type CreateArticleProps = Omit<Article, 'id' | 'publisher'> & {
    publisherId: number
}
