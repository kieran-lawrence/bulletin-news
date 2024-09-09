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
export type Comment = {
    id: number
    article: number
    author: string
    text: string
    publishedAt: string
}
