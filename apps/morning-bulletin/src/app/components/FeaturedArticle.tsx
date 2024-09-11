import Link from 'next/link'
import { SectionWrapperStyle } from '../styles/shared'
import { PublisherNameAndDate } from './PublisherNameAndDate'
import { ArticleTitle } from './ArticleTitle'
import { ArticleDescription } from './ArticleDescription'
import { ArticleCategoryReadTime } from './ArticleCategoryReadTime'
import styled from 'styled-components'
import { useGetArticleByIdQuery } from '../utils/store/article'
import { getArticleSectionText } from '../utils/helpers'

type Props = {
    articleId: string
}
export const FeaturedArticle = ({ articleId }: Props) => {
    const {
        data: article,
        error,
        isLoading,
    } = useGetArticleByIdQuery(articleId)

    return (
        <SectionWrapperStyle>
            <FeaturedArticleHero>
                <h1>Welcome to Bulletin</h1>
                <h2>
                    Crafting narratives 📝 that ignite inspiration 💡, knowledge
                    📖 and entertainment 🎬 since 1985
                </h2>
            </FeaturedArticleHero>
            {error && <>An error has occurred</>}
            {isLoading && <>Loading...</>}
            {article && !isLoading && (
                <StyledArticleLink
                    key={article.id}
                    href={`/articles/${article.id}`}
                >
                    <StyledImageWrapper>
                        <StyledArticleImage
                            src={article?.urlToImage}
                            alt={article?.title}
                        />
                    </StyledImageWrapper>
                    <StyledArticleWrapper>
                        <PublisherNameAndDate
                            publisherName={article.publisher.name}
                            datePublished={article.publishedAt}
                            publisherLogoUrl={article.publisher.logoUrl}
                            fontSize="16px"
                        />
                        <ArticleTitle
                            shouldGrow={true}
                            title={article.title}
                            fontSize="32px"
                            truncAt={200}
                        />
                        <ArticleDescription
                            description={getArticleSectionText(
                                article.articleSections,
                            )}
                            truncAt={200}
                        />
                        <ArticleCategoryReadTime
                            articleCategory={article.category}
                            articleReadTime={article.readTime}
                        />
                    </StyledArticleWrapper>
                </StyledArticleLink>
            )}
        </SectionWrapperStyle>
    )
}
const FeaturedArticleHero = styled.div`
    background: #f5f5f5;
    border-radius: 5px;
    display: grid;
    width: 100%;
    place-items: center;
    padding: 28px 0;
    color: #1f1f1f;

    h1 {
        text-transform: uppercase;
        font-size: 16px;
        padding: 16px 0;
        letter-spacing: 2px;
        color: #1f1f1f;
    }
    h2 {
        font-size: 24px;
        width: 50%;
    }
`
const StyledArticleLink = styled(Link)`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin-top: 25px;
    text-decoration: none;
    padding: 5px;
    border-radius: 5px;
    &:hover {
        background-color: #f9f9f9f4;
    }
`
const StyledImageWrapper = styled.div`
    width: 50%;
    padding-right: 40px;
`
const StyledArticleImage = styled.img`
    border-radius: 5px;
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
`
const StyledArticleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0 20px;
    width: 50%;
`
