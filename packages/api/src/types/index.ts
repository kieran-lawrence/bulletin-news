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
export declare type Intention = Link | Emphasis | Important | Text

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
    firstName: string
    lastName: string
    email: string
    dateOfBirth: string
    password: string
    role: UserRole
}

export enum UserRole {
    USER = 'user',
    MOD = 'moderator',
    ADMIN = 'administrator',
}

export type ValidateUserCredentialsParams = {
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

export interface CreateUserParams {
    firstName: string
    lastName: string
    email: string
    dateOfBirth: string
    password: string
    role?: UserRole
}

export interface CreateArticleParams {
    author: string
    title: string
    category: string
    readTime: number
    urlToImage: string
    publishedAt: string
    flags: string[]
    articleSections: ArticleSection[]
    publisherId: number
}
