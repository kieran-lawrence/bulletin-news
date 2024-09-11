import styled from 'styled-components'
import { truncateArticleText } from '../utils/helpers'
import { Article } from '../utils/types'
import Link from 'next/link'

interface NumberedAsideProps {
    articles: Article[]
    heading: string
}
export const NumberedAside = ({ articles, heading }: NumberedAsideProps) => {
    return (
        <StyledNumberedAside>
            <h2>{heading}</h2>
            <NumberedArticleContainer>
                {articles.map((article, index) => (
                    <>
                        {index === 0 && (
                            <img src={article.urlToImage} alt={article.title} />
                        )}
                        <ArticleCounter>{index + 1}</ArticleCounter>
                        <ArticleList key={article.id}>
                            <Link href={`/articles/${article.id}`}>
                                {truncateArticleText(article.title, 65)}
                            </Link>
                            <TrendingArticleCategory>
                                <Link href={`/categories/${article.category}`}>
                                    {article.category}
                                </Link>{' '}
                                • <small>{article.readTime} min read</small>
                            </TrendingArticleCategory>
                        </ArticleList>
                    </>
                ))}
            </NumberedArticleContainer>
        </StyledNumberedAside>
    )
}

const StyledNumberedAside = styled.aside`
    width: 15vw;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 16px;

    h2 {
        margin: 0;
    }
`
const NumberedArticleContainer = styled.div`
    background: #f5f5f5;
    border-radius: 16px;
    padding: 16px;
    display: grid;
    place-items: center;
    grid-template-columns: auto 3fr;
    grid-template-rows: auto auto auto auto auto;
    row-gap: 20px;
    column-gap: 16px;

    img {
        border-radius: 12px;
        aspect-ratio: 1/1;
        object-fit: cover;
        width: 100%;
        grid-column: 1 / span 2;
    }
`
const ArticleCounter = styled.div`
    color: #e9353b;
    font-size: 32px;
    font-weight: 500;
    font-family: 'Noto Serif', serif;
`
const ArticleList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    a {
        font-family: 'Noto Serif', serif;
        font-weight: 500;
        margin: 0;
        color: inherit;
        text-decoration: none;
        font-size: 18px;
        &:hover {
            text-decoration: underline;
        }
    }
`
const TrendingArticleCategory = styled.div`
    text-transform: capitalize;

    a {
        text-decoration: none;
        color: #e9353b;
        font-size: 14px;
    }
    small {
        text-transform: none;
        font-size: 14px;
    }
`
