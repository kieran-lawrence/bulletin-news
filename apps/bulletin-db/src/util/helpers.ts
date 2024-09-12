/** Finds the offset (current page) by multiplying the desired page by the page size
 */
export const calculateSkip = (page: number, pageSize: number): number => {
    return page <= 1 ? 0 : (page - 1) * pageSize
}
