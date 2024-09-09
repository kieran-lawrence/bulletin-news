import { format, differenceInHours } from 'date-fns'
import { ArticleSection } from './types'

/**
 * Returns a relative date based on the difference between the current date and the provided date
 * @param date The date to be formatted
 * @returns One of the following: `just now` | `X hours ago` | `Aug 27th 2020`
 */
export const formatDate = (date: string) => {
    const oneDayFromNow = new Date().getTime() + 1 * 24 * 60 * 60 * 1000
    const difference = differenceInHours(oneDayFromNow, Date.parse(date))
    if (difference <= 1) {
        return <>just now</>
    } else if (difference <= 24) {
        return <>{format(new Date(), "H 'hours ago'")}</>
    } else {
        return <>{format(new Date(date), 'MMM do, yyyy')}</>
    }
}
/**
 *
 * @param desc The text to check
 * @param length The number of characters to truncate `desc` at
 * @returns The provided text shortened to the desired characters with ellipses at the end
 */
export const truncateArticleText = (desc: string, length: number) => {
    return desc.length > length ? `${desc.substring(0, length)}...` : desc
}
/**
 * Finds the first content block of type text
 * @param sections The content blocks (sections) to search
 * @returns The value of the first instance of a content block of type text
 */
export const getArticleSectionText = (sections: ArticleSection[]): string => {
    const section = sections.find((s) => s.kind === 'text')
    return section?.text || 'An article description'
}
