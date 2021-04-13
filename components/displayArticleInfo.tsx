import dayjs from 'dayjs'
import IArticle from '../interfaces/IArticle'
import { sortArticlesByPublishedDate } from '../lib/calculateStreak'

interface IProps {
    articles: IArticle[]
}

const DisplayArticleInfo = ({ articles }: IProps) => {
    const [latestArticle] = sortArticlesByPublishedDate(articles)
    const publishedAt = dayjs(latestArticle.published_at)
    return (
        <a
            href={latestArticle.url}
            target="_blank"
            rel="noreferrer noopener"
            className="pt-1 md:pt-2 text-gray-500 text-sm hover:text-button-primary-bg-hover transition-colors block"
        >
            Last published:
            <span className="mx-1">
                {publishedAt.year() === dayjs().year() ? publishedAt.format('D MMM') : publishedAt.format('D MMM YYYY')}
            </span>
            (
            <span>
                {publishedAt.fromNow()}
            </span>
            )
        </a>
    )
}

export default DisplayArticleInfo
