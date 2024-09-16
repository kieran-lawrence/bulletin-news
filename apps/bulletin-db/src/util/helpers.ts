import * as bcrypt from 'bcryptjs'

/** Finds the offset (current page) by multiplying the desired page by the page size
 */
export const calculateSkip = (page: number, pageSize: number): number => {
    return page <= 1 ? 0 : (page - 1) * pageSize
}

/** Hash a password using a unique 'salt' string */
export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(password, salt)
}
/** Verify 2 hashed passwords to ensure they are the same */
export async function compareHash(rawPassword: string, hashedPassword: string) {
    return bcrypt.compare(rawPassword, hashedPassword)
}
