import IArticle from './IArticle'

interface IPublishedWeekYear {
    id: IArticle['id']
    published_at: IArticle['published_at']
    week: number
    year: number
}

export default IPublishedWeekYear;
