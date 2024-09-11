import Link from 'next/link'
import React from 'react'
import { useGetArticlesByFlagQuery } from '../utils/store/article'
import { PublisherNameAndDate } from './PublisherNameAndDate'
import { ArticleTitle } from './ArticleTitle'
import { ArticleDescription } from './ArticleDescription'
import { ArticleCategoryReadTime } from './ArticleCategoryReadTime'
import { getArticleSectionText } from '../utils/helpers'
import { SectionHeader } from './SectionHeader'
import { SectionWrapperStyle } from '../styles/shared'
import styled from 'styled-components'
import { Loader } from './Loader'

export const MustRead = () => {
    const {
        data: articles,
        error,
        isLoading,
    } = useGetArticlesByFlagQuery({ flag: 'must-read', page_size: 4 })

    return (
        <SectionWrapperStyle>
            <SectionHeader
                headerText="Must Read"
                showSeeMoreText
                href="/flags/must-read"
            />
            <StyledMustReadWrapper>
                {isLoading && <Loader />}
                {articles &&
                    articles.slice(0, 4).map((article, index) => (
                        <StyledMustReadCard
                            key={index}
                            href={`/articles/${article.id}`}
                        >
                            <img
                                className="cardImage"
                                src={article.urlToImage}
                                alt={article.title}
                            />
                            <div className="cardDetails">
                                <PublisherNameAndDate
                                    publisherName={article.publisher.name}
                                    datePublished={article.publishedAt}
                                    publisherLogoUrl={article.publisher.logoUrl}
                                    fontSize="11px"
                                    fontColor={
                                        index === 1 ? '#f1f1f1' : undefined
                                    }
                                />
                                <ArticleTitle
                                    title={article.title}
                                    fontSize={index === 1 ? '28px' : '16px'}
                                    truncAt={55}
                                    fontColor={
                                        index === 1 ? '#f1f1f1' : undefined
                                    }
                                />
                                {index < 2 && (
                                    <ArticleDescription
                                        description={getArticleSectionText(
                                            article.articleSections,
                                        )}
                                        truncAt={100}
                                        fontSize="13px"
                                        fontColor={
                                            index === 1 ? '#f1f1f1' : undefined
                                        }
                                    />
                                )}
                                <ArticleCategoryReadTime
                                    articleCategory={article.category}
                                    articleReadTime={article.readTime}
                                    fontSize="11px"
                                    fontColor={
                                        index === 1 ? '#f1f1f1' : undefined
                                    }
                                />
                            </div>
                        </StyledMustReadCard>
                    ))}
            </StyledMustReadWrapper>
        </SectionWrapperStyle>
    )
}

const StyledMustReadWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    width: 100%;
    min-height: 25vh;
    column-gap: 12px;
    row-gap: 6px;
`
const StyledMustReadCard = styled(Link)`
    text-decoration: none;
    padding: 5px;
    border-radius: 5px;
    height: fit-content;
    &:hover {
        background-color: #f9f9f9f4;
    }
    .cardImage {
        width: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: 5px;
    }
    .cardDetails {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;
        border-radius: 5px;
    }
    &:nth-of-type(1) {
        grid-row: 1 / span 2;
        grid-column: 1;
    }
    &:nth-of-type(2) {
        grid-row: 1 / span 2;
        grid-column: 2;
        position: relative;

        .cardDetails {
            position: absolute;
            bottom: 0;
            left: 0;
            text-align: left;
            display: flex;
            flex-direction: column;
            gap: 16px;
            padding: 16px;
        }
    }
    &:nth-of-type(3) {
        grid-row: 1/2;
        grid-column: 3/3;

        .cardImage {
            aspect-ratio: 16/9;
        }
    }
    &:nth-of-type(4) {
        grid-row: 2/2;
        grid-column: 3/3;
        .cardImage {
            aspect-ratio: 16/9;
        }
    }
`
