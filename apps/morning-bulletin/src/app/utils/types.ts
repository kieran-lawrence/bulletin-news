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
}
export type Comment = {
    id: number
    text: string
    publishedAt: string
    user: User
    article: Article
    status: CommentStatus
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
export enum CommentStatus {
    LIVE = 'live',
    DEAD = 'dead',
}

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
