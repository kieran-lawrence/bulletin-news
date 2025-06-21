export type Publisher = {
    id: number
    handle: string
    name: string
    description: string
    logoUrl: string
    category: string
}
export type Article = {
    id: number
    publisher: Publisher
    author: string
    title: string
    articleSections: ArticleSection[]
    category: string
    readTime: number
    urlToImage: string
    publishedAt: string
    flags: [string]
    comments?: Comment[]
}
export type Comment = {
    id: number
    parentId: number | null
    parent: Comment | null
    replies: Comment[]
    content: string
    status: CommentStatus
    likeCount: number
    createdAt: string
    updatedAt: string
    article: Article
    articleId: number
    author: User
    authorId: number
}
export type Thread = {
    id: number
}
export type ThreadParticipant = {
    thread_participant_id: number
    userId: number
    threadId: number
}
export type User = {
    id: number
    name: string
    email: string
    dateOfBirth?: string
    role: UserRole
}

export enum UserRole {
    USER = 'user',
    MOD = 'moderator',
    ADMIN = 'administrator',
}
export type CommentStatus =
    | 'PENDING' // New comment, awaiting review
    | 'APPROVED' // Approved by a moderator
    | 'REJECTED' // Reviewed and rejected by a moderator
    | 'FLAGGED' // Community flagged, needs review by a moderator

export declare type Intention = Link | Emphasis | Important | Text
export declare type ArticleSection =
    | TextSection
    | ImageSection
    | QuoteSection
    | HeadingSection
interface IntentionType {
    kind: string
    index: number
    length: number
}
export interface Link extends IntentionType {
    kind: 'link'
    link: string
}

export interface Emphasis extends IntentionType {
    kind: 'emphasized'
    text: string
}

export interface Important extends IntentionType {
    kind: 'important'
    text: string
}
export interface Text extends IntentionType {
    kind: 'text'
    text: string
}

interface ArticleSections {
    kind: string
}
export interface TextSection extends ArticleSections {
    kind: 'text'
    text: string
    intentions?: Intention[]
}
export interface ImageSection extends ArticleSections {
    kind: 'image'
    url: string
    text: string
    intentions?: Intention[]
}
export interface QuoteSection extends ArticleSections {
    kind: 'quote'
    text: string
    attribution: string
}
export interface HeadingSection extends ArticleSections {
    kind: 'heading'
    text: string
}
export type CreateCommentDto = {
    content: string
    articleId: number
    authorId: number
}

export type CreateCommentReplyDto = {
    commentId: number
    content: string
    articleId: number
    authorId: number
}
