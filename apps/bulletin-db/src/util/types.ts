export type ArticleSection = {
    kind: string
    text?: string
    intentions: Intention[]
    attribution?: string
    url?: string
}
export type Intention = {
    kind: string
    index: number
    length: number
    link?: string
}
export type Article = {
    id: number
    author: string
    title: string
    category: string
    readTime: number
    urlToImage: string
    publishedAt: string
    flags: string[]
    articleSections: ArticleSection[]
    publisher: Publisher
}
export type Publisher = {
    id: number
    handle: string
    name: string
    description: string
    logoUrl?: string
    category: string
}
export type User = {
    id: number
    name: string
    email: string
    dateOfBirth: string
    password: string
    role: UserRole
}
export type Comment = {
    id: number
    text: string
    publishedAt: string
    user: User
    article: Article
    status: CommentStatus
}
export enum UserRole {
    USER = 'user',
    MOD = 'moderator',
    ADMIN = 'administrator',
}
export enum CommentStatus {
    LIVE = 'live',
    DEAD = 'dead',
}
export type ValidateUserCredentials = {
    email: string
    password: string
}
export interface PaginationParams {
    page?: number
    page_size?: number
}
export interface FindArticleByCategoryParams extends PaginationParams {
    category: string
}
export interface FindArticleByFlagParams extends PaginationParams {
    flag: string
}
export interface FindCommentsByStatusParams extends PaginationParams {
    status: CommentStatus
}
export interface CreateUserParams {
    name: string
    email: string
    dateOfBirth: string
    password: string
    role?: UserRole
}
