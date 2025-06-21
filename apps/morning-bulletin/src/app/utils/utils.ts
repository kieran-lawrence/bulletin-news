import { Comment as CommentType, User } from './types'

export function getInitials(name: string): string {
    if (!name) return ''
    const [first, second] = name.split(' ')
    if (!second) return first.charAt(0).toUpperCase()
    return (first.charAt(0) + second.charAt(0)).toUpperCase()
}

export const getShortenedName = (user: User): string => {
    const [first, last] = user.name.split(' ')
    return `${first} ${last.substring(0, 1)}`
}
