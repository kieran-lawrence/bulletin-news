import { Descendant, BaseEditor, BaseRange, Range, Element } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type BlockQuoteElement = {
    type: 'block-quote'
    children: Descendant[]
}

export type BulletedListElement = {
    type: 'bulleted-list'
    children: Descendant[]
}

export type ListItemElement = { type: 'list-item'; children: Descendant[] }

export type ParagraphElement = {
    type: 'paragraph'
    children: Descendant[]
}

export type ImageElement = {
    type: 'image'
    url: string
    children: Descendant[]
}

type CustomElement =
    | BlockQuoteElement
    | BulletedListElement
    | ListItemElement
    | ParagraphElement
    | ImageElement

export type CustomElementType = CustomElement['type']

export type CustomText = {
    bold?: boolean
    italic?: boolean
    underline?: boolean
    list?: boolean
    blockquote?: boolean
    text: string
}

export type CustomTextKey = keyof Omit<CustomText, 'text'>

export type CustomEditor = BaseEditor &
    ReactEditor &
    HistoryEditor & {
        nodeToDecorations?: Map<Element, Range[]>
    }

declare module 'slate' {
    interface CustomTypes {
        Editor: CustomEditor
        Element: CustomElement
        Text: CustomText
        Range: BaseRange & {
            [key: string]: unknown
        }
    }
}
