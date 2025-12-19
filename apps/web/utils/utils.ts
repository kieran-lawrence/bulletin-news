import { User } from '@repo/api'

export function getInitials(user: User): string {
    const { firstName, lastName } = user
    if (!firstName) return ''
    if (!lastName) return firstName.charAt(0).toUpperCase()
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase()
}

/** Omits the user's last name */
export const getShortenedName = (user: User): string => {
    const { firstName, lastName } = user
    if (!firstName) return ''
    if (!lastName) return firstName
    return `${firstName} ${lastName.substring(0, 1)}`
}
