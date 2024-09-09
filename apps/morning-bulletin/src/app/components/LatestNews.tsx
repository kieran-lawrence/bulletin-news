import Link from 'next/link'
import { SectionWrapperStyle } from '../styles/shared'
import { getArticleSectionText } from '../utils/helpers'
import { useGetArticlesQuery } from '../utils/store/article'
import { ArticleCategoryReadTime } from './ArticleCategoryReadTime'
import { ArticleDescription } from './ArticleDescription'
import { ArticleTitle } from './ArticleTitle'
import { PublisherNameAndDate } from './PublisherNameAndDate'
import { SectionHeader } from './SectionHeader'
import styled from 'styled-components'

export const LatestNews = () => {
    const { data: articles, error, isLoading } = useGetArticlesQuery('')
    return (
        <SectionWrapperStyle>
            <SectionHeader headerText="Latest News" showSeeMoreText />
            {isLoading && <>Loading...</>}
            {articles && (
                <LatestNewsContainer>
                    {articles.slice(0, 4).map((article) => (
                        <StyledLatestNewsLink
                            key={article.id}
                            href={`/articles/${article.id}`}
                        >
                            <StyledLatestNewsImage
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
                                truncAt={75}
                                shouldGrow
                            />
                            <ArticleDescription
                                description={getArticleSectionText(
                                    article.articleSections,
                                )}
                                truncAt={150}
                                fontSize="13px"
                            />
                            <ArticleCategoryReadTime
                                articleCategory={article.category}
                                articleReadTime={article.readTime}
                                fontSize="11px"
                            />
                        </StyledLatestNewsLink>
                    ))}
                </LatestNewsContainer>
            )}
        </SectionWrapperStyle>
    )
}

const LatestNewsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 18px;
`
export const StyledLatestNewsLink = styled(Link)`
    width: 25%;
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
`
export const StyledLatestNewsImage = styled.img`
    border-radius: 5px;
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    margin-bottom: 5px;
`
