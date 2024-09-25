import styled from 'styled-components'
import { useGetArticlesByCategoryQuery } from '../../utils/store/article'
import { Loader } from '../Loader'
import Link from 'next/link'
import { PublisherNameAndDate } from '../PublisherNameAndDate'
import { ArticleTitle } from '../ArticleTitle'
import { ArticleCategoryReadTime } from '../ArticleCategoryReadTime'

type CategoriesProps = {
    category: string
}

export const CategoriesPage = ({ category }: CategoriesProps) => {
    const { data, isLoading, error } = useGetArticlesByCategoryQuery({
        category,
        page_size: 12,
    })

    return (
        <CategoriesPageWrapper>
            {isLoading && <Loader />}
            <h1>{category}</h1>
            <div className="articleGrid">
                {data &&
                    data.map((article) => (
                        <ArticleWrapper
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
                                truncAt={55}
                                shouldGrow
                            />
                            <ArticleCategoryReadTime
                                articleCategory={article.category}
                                articleReadTime={article.readTime}
                                fontSize="11px"
                            />
                        </ArticleWrapper>
                    ))}
            </div>
        </CategoriesPageWrapper>
    )
}
const CategoriesPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px 0;

    h1 {
        text-transform: capitalize;
        font-size: 26px;
        font-weight: 600;
    }
    .articleGrid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;

        gap: 16px;
        width: 40vw;
    }
`
const ArticleWrapper = styled(Link)`
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-decoration: none;
    padding: 5px;
    border-radius: 5px;
    color: white;

    .mainImage {
        border-radius: 5px;
        width: 100%;
        aspect-ratio: 3/2;
        object-fit: cover;
        margin-bottom: 5px;
    }

    &:nth-of-type(1) {
        grid-column: 1 / span 3;
        grid-row: 1;

        .mainImage {
            aspect-ratio: 16/9;
        }
    }

    &:nth-of-type(4) {
        grid-column: 3;
        grid-row: 3 / span 2;
        .mainImage {
            aspect-ratio: 9/16;
        }
    }

    &:nth-of-type(7) {
        grid-column: 1 / span 2;
        grid-row: 5 / span 2;
        .mainImage {
            aspect-ratio: 1/1;
        }
    }

    &:hover {
        background-color: #f4f4f4;
    }
    transition: background 0.2s;
`
