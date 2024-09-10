import Link from 'next/link'
import { SectionWrapperStyle } from '../styles/shared'
import { useGetArticlesByCategoryQuery } from '../utils/store/article'
import { SectionHeader } from './SectionHeader'
import { PublisherNameAndDate } from './PublisherNameAndDate'
import { ArticleTitle } from './ArticleTitle'
import { ArticleCategoryReadTime } from './ArticleCategoryReadTime'
import styled from 'styled-components'

// Types for parent component
type Categories = {
    firstCategory: string
    secondCategory: string
}
// Props for child component
type Props = {
    category: string
}

export const Categories = ({ firstCategory, secondCategory }: Categories) => {
    return (
        <StyledCategoriesContainerWrapper>
            <Category category={firstCategory} />
            <Category category={secondCategory} />
        </StyledCategoriesContainerWrapper>
    )
}

const Category = ({ category }: Props) => {
    const {
        data: articles,
        error,
        isLoading,
    } = useGetArticlesByCategoryQuery(category)

    return (
        <SectionWrapperStyle>
            <SectionHeader
                headerText={category}
                href={`/categories/${category}`}
            />
            <StyledCategoriesWrapper>
                {isLoading && <>Loading...</>}
                {articles &&
                    articles.slice(0, 2).map((article) => (
                        <StyledCategoryLink
                            key={article.id}
                            href={`/articles/${article.id}`}
                        >
                            <img
                                className="mainImage"
                                src={article.urlToImage}
                                alt={article.title}
                            />
                            <PublisherNameAndDate
                                datePublished={article.publishedAt}
                                publisherName={article.publisher.name}
                                fontSize="11px"
                                publisherLogoUrl={article.publisher.logoUrl}
                            />
                            <ArticleTitle
                                fontSize="16px"
                                title={article.title}
                                truncAt={85}
                                shouldGrow
                            />
                            <ArticleCategoryReadTime
                                articleCategory={article.category}
                                articleReadTime={article.readTime}
                                fontSize="11px"
                            />
                        </StyledCategoryLink>
                    ))}
            </StyledCategoriesWrapper>
        </SectionWrapperStyle>
    )
}
const StyledCategoriesContainerWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`
const StyledCategoriesWrapper = styled.div`
    display: flex;
    width: 100%;
    gap: 16px;
`
const StyledCategoryLink = styled(Link)`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    gap: 10px;
    text-decoration: none;
    padding: 5px;
    border-radius: 5px;
    &:hover {
        background-color: #f9f9f9f4;
    }
    .mainImage {
        border-radius: 5px;
        width: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
        margin-bottom: 5px;
    }
`
