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
    publisherId: Publisher
}
export type Publisher = {
    id: number
    handle: string
    name: string
    description: string
    logoUrl?: number
    category: string
}

export interface FindArticleParams {
    page?: number
    page_size?: number
}
