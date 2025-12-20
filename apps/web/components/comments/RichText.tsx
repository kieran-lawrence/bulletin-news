import React, {
    KeyboardEvent,
    MouseEvent,
    PropsWithChildren,
    ReactNode,
    useCallback,
    useMemo,
} from 'react'
import {
    Descendant,
    Editor,
    Element as SlateElement,
    Transforms,
    createEditor,
} from 'slate'
import { withHistory } from 'slate-history'
import {
    Editable,
    RenderElementProps,
    RenderLeafProps,
    Slate,
    useSlate,
    withReact,
} from 'slate-react'
import {
    CustomEditor,
    CustomElementType,
    CustomTextKey,
    ImageElement,
    ParagraphElement,
} from './custom-types'
import styled from 'styled-components'
import {
    FaBold,
    FaItalic,
    FaUnderline,
    FaQuoteLeft,
    FaList,
    FaCamera,
} from 'react-icons/fa'
import isHotkey from 'is-hotkey'
import { BulletinButton, StyledBlockQuote } from '../../utils/styles/shared'

export const RichTextInput = ({
    initialValue,
    readOnly = true,
    showToolbar = false,
    onSubmit,
    replyingTo,
    mode,
    buttonText = 'Submit',
    placeholder = 'Write a comment...',
}: {
    initialValue: Descendant[]
    readOnly?: boolean
    showToolbar?: boolean
    onSubmit: (values: Descendant[]) => void
    replyingTo?: string
    mode: 'comment' | 'edit'
    buttonText?: string
    placeholder?: string
}) => {
    const [value, setValue] = React.useState<Descendant[]>(initialValue)
    const renderElement = useCallback(
        (props: RenderElementProps) => <Element {...props} />,
        [],
    )
    const renderLeaf = useCallback(
        (props: RenderLeafProps) => <Leaf {...props} />,
        [],
    )
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    return (
        <Slate
            editor={editor}
            initialValue={value}
            onChange={(value) => {
                const isAstChange = editor.operations.some(
                    (op) => 'set_selection' !== op.type,
                )
                if (isAstChange) {
                    // Save the value to Local Storage.
                    setValue(value)
                }
            }}
        >
            {showToolbar && (
                <Toolbar>
                    <MarkButton format="bold" icon={<FaBold />} />
                    <MarkButton format="italic" icon={<FaItalic />} />
                    <MarkButton format="underline" icon={<FaUnderline />} />
                    <BlockButton format="block-quote" icon={<FaQuoteLeft />} />
                    <BlockButton format="bulleted-list" icon={<FaList />} />
                    <BlockButton format="image" icon={<FaCamera />} />
                </Toolbar>
            )}
            {replyingTo && (
                <span className="replyingTo">Replying to {replyingTo}</span>
            )}
            <StyledEditorContainer className="editorContainer">
                <Editable
                    className="richTextEditor"
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder={placeholder}
                    renderPlaceholder={({ children, attributes }) => (
                        <span
                            {...attributes}
                            style={{
                                pointerEvents: 'none',
                                display: 'inline-block',
                                width: '100%',
                                maxWidth: '100%',
                                whiteSpace: 'nowrap',
                                opacity: 0.5,
                                userSelect: 'none',
                                fontStyle: 'normal',
                                fontWeight: 'normal',
                                textDecoration: 'none',
                                position: 'absolute',
                                top: '6px',
                            }}
                        >
                            {children}
                        </span>
                    )}
                    spellCheck
                    autoFocus
                    readOnly={readOnly}
                    onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
                        if (isHotkey('mod+b', event)) {
                            event.preventDefault()
                            toggleMark(editor, 'bold')
                        }
                        if (isHotkey('mod+i', event)) {
                            event.preventDefault()
                            toggleMark(editor, 'italic')
                        }
                        if (isHotkey('mod+u', event)) {
                            event.preventDefault()
                            toggleMark(editor, 'underline')
                        }
                    }}
                />
                {!readOnly && (
                    <BulletinButton
                        onClick={() => {
                            // Call the onSubmit function with the current value, which attempts to create the comment/reply
                            onSubmit(value)

                            // If the mode is 'comment', we want to clear the editor to allow for a new comment
                            if (mode === 'comment') {
                                // Remove all nodes
                                while (editor.children.length > 0) {
                                    Transforms.removeNodes(editor, { at: [0] })
                                }
                                // Insert a new empty paragraph
                                Transforms.insertNodes(editor, {
                                    type: 'paragraph',
                                    children: [{ text: '' }],
                                })
                                // Move selection to start
                                Transforms.select(editor, [0, 0])
                                // If we are editing an existing comment, don't clear the editor
                            } else if (mode === 'edit') {
                                onSubmit(value)
                            }
                        }}
                    >
                        {buttonText}
                    </BulletinButton>
                )}
            </StyledEditorContainer>
        </Slate>
    )
}

const Element = ({ attributes, children, element }: RenderElementProps) => {
    switch (element.type) {
        case 'block-quote':
            return (
                <StyledBlockQuote {...attributes}>{children}</StyledBlockQuote>
            )
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>
        case 'list-item':
            return <li {...attributes}>{children}</li>
        case 'image':
            return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    {...attributes}
                    src={element.url}
                    alt="Rich Text Editor Image"
                    style={{ maxWidth: '100%' }}
                />
            )
        case 'paragraph':
        default:
            return <p {...attributes}>{children}</p>
    }
}

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}

interface BlockButtonProps {
    format: CustomElementType
    icon: ReactNode
}

const BlockButton = ({ format, icon }: BlockButtonProps) => {
    const editor = useSlate()
    const handleMouseDown = (event: MouseEvent<HTMLSpanElement>) => {
        event.preventDefault()
        if (format === 'image') {
            const url = window.prompt('Enter the image URL:')
            if (url) {
                // Insert the image at the current selection
                const image: ImageElement = {
                    type: 'image',
                    url,
                    children: [{ text: '' }],
                }
                Transforms.insertNodes(editor, image)
                // Insert a new paragraph after the image so the user can continue typing
                const paragraph: ParagraphElement = {
                    type: 'paragraph',
                    children: [{ text: '' }],
                }
                Transforms.insertNodes(editor, paragraph)
                // Move selection to the new paragraph
                const { selection } = editor
                if (selection) {
                    const [currentNode] = Editor.nodes(editor, {
                        at: selection,
                        match: (n) =>
                            SlateElement.isElement(n) && n.type === 'image',
                    })
                    if (currentNode) {
                        const [, path] = currentNode
                        if (path && typeof path[0] === 'number') {
                            const nextPath = [path[0] + 1, 0]
                            Transforms.select(editor, nextPath)
                        }
                    }
                }
            }
        } else {
            toggleBlock(editor, format)
        }
    }
    return (
        <button
            onMouseDown={handleMouseDown}
            className={isBlockActive(editor, format) ? 'active' : ''}
        >
            {icon}
        </button>
    )
}

interface MarkButtonProps {
    format: CustomTextKey
    icon: ReactNode
}

const MarkButton = ({ format, icon }: MarkButtonProps) => {
    const editor = useSlate()
    return (
        <button
            onMouseDown={(event: MouseEvent<HTMLSpanElement>) => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
            className={isMarkActive(editor, format) ? 'active' : ''}
        >
            {icon}
        </button>
    )
}

export const Toolbar = ({ children }: PropsWithChildren<{}>) => {
    return <StyledToolbar>{children}</StyledToolbar>
}

const toggleBlock = (editor: CustomEditor, format: CustomElementType) => {
    const isActive = isBlockActive(editor, format)
    const isList = format === 'bulleted-list'
    const isImage = format === 'image'

    Transforms.unwrapNodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === 'bulleted-list',
        split: true,
    })
    const newProperties: Partial<SlateElement> = {
        type: isActive
            ? 'paragraph'
            : isList
              ? 'list-item'
              : isImage
                ? 'image'
                : format,
    }
    Transforms.setNodes<SlateElement>(editor, newProperties)

    if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}

const toggleMark = (editor: CustomEditor, format: CustomTextKey) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

const isBlockActive = (editor: CustomEditor, format: CustomElementType) => {
    const { selection } = editor
    if (!selection) return false

    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: (n) => {
                if (!Editor.isEditor(n) && SlateElement.isElement(n)) {
                    return n.type === format
                }
                return false
            },
        }),
    )

    return !!match
}

const isMarkActive = (editor: CustomEditor, format: CustomTextKey) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

const StyledToolbar = styled.div`
    border-bottom: 1px solid #a6a6a69f;
    padding-bottom: 8px;
    margin-bottom: 16px;
    display: flex;
    gap: 4px;

    button {
        border: 1px solid #ddd;
        background: inherit;
        border-radius: 4px;
        display: grid;
        place-items: center;
        padding: 8px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;

        &.active {
            border: 1px solid #e50914;
            background: white;
        }
    }
`
const StyledEditorContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    gap: 8px;
    width: 100%;
    min-height: 43px;
`
