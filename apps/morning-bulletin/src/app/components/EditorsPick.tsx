/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { SectionWrapperStyle } from '../styles/shared'
import { useGetArticlesByFlagQuery } from '../utils/store/article'
import { SectionHeader } from './SectionHeader'
import { PublisherNameAndDate } from './PublisherNameAndDate'
import { ArticleTitle } from './ArticleTitle'
import { ArticleCategoryReadTime } from './ArticleCategoryReadTime'
import styled from 'styled-components'

export const EditorPick = () => {
    const {
        data: articles,
        error,
        isLoading,
    } = useGetArticlesByFlagQuery({ flag: 'editors-pick', page_size: 5 })

    return (
        <SectionWrapperStyle>
            <SectionHeader
                headerText="Editors Pick"
                showSeeMoreText
                href="/flags/editors-pick"
            />
            {isLoading && <>Loading...</>}
            <EditorsPickWrapper>
                {articles && (
                    <EditorsPickItem
                        key={articles[0].id}
                        href={`/articles/${articles[0].id}`}
                    >
                        <img
                            className="mainImage"
                            src={articles[0].urlToImage}
                            alt={articles[0].title}
                        />
                        <div className="cardDetails">
                            <PublisherNameAndDate
                                datePublished={articles[0].publishedAt}
                                publisherName={articles[0].publisher.name}
                                fontSize="11px"
                                publisherLogoUrl={articles[0].publisher.logoUrl}
                                fontColor="#f1f1f1"
                            />
                            <ArticleTitle
                                fontSize="28px"
                                title={articles[0].title}
                                truncAt={85}
                                shouldGrow
                                fontColor="#f1f1f1"
                            />
                            <ArticleCategoryReadTime
                                articleCategory={articles[0].category}
                                articleReadTime={articles[0].readTime}
                                fontSize="11px"
                                fontColor="#f1f1f1"
                            />
                        </div>
                    </EditorsPickItem>
                )}
                {articles &&
                    articles.slice(1, 5).map((article) => (
                        <EditorsPickItem
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
                        </EditorsPickItem>
                    ))}
            </EditorsPickWrapper>
        </SectionWrapperStyle>
    )
}
const EditorsPickWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 16px;
    width: 100%;

    .mainImage {
        border-radius: 5px;
        width: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
        margin-bottom: 5px;
    }
`
const EditorsPickItem = styled(Link)`
    width: 100%;
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
        aspect-ratio: 1/1;
        object-fit: cover;
    }

    &:nth-of-type(1) {
        grid-row: 1;
        grid-column: 1 / span 4;

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

        .mainImage {
            aspect-ratio: 5.5/2;
            object-fit: cover;
        }
    }
    &:nth-of-type(2) {
        grid-row: 2;
        grid-column: 1;
    }
    &:nth-of-type(3) {
        grid-row: 2;
        grid-column: 2;
    }
    &:nth-of-type(4) {
        grid-row: 2;
        grid-column: 3;
    }
    &:nth-of-type(5) {
        grid-row: 2;
        grid-column: 4;
    }
`
