import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import IArticle from '../interfaces/IArticle';
import en from 'dayjs/locale/en';
import IPublishedWeekYear from '../interfaces/IPublishedWeekYear';

dayjs.extend(relativeTime)
dayjs.extend(weekOfYear)

dayjs.locale({
    ...en,
    weekStart: 1,
});

// https://github.com/forem/forem/blob/a439446d67f4860b04148d6c942621b26bf08bb7/app/labor/badge_rewarder.rb#L90
// https://github.com/forem/forem/blob/a439446d67f4860b04148d6c942621b26bf08bb7/spec/labor/badge_rewarder_spec.rb#L79
// Newer:
// https://github.com/forem/forem/blob/009c14653ab84da91cf278400350503e056bef29/app/services/badges/award_streak.rb

const LONGEST_STREAK_WEEKS = 16
const LONGEST_STREAK_TEMPLATE = "weeks! You've achieved the longest writing \
  streak possible (16 weeks). This makes you eligible for special quests in the future. \
  Keep up the amazing contributions to our community!";

export const createStreakMessage = (streak: number) => {
    if (streak >= LONGEST_STREAK_WEEKS) {
        return `${streak} ${LONGEST_STREAK_TEMPLATE}`;
    }
    let nextBadge = 4;
    if (streak === 0) {
        return "Post on Dev.to to start your writing streak! (Currently 0)"
    } else if (streak >= 4 && streak < 8) {
        nextBadge = 8;
    } else if (streak >= 8) {
        nextBadge = 16;
    }
    return `Congrats on achieving a ${streak} week streak! Consistent writing is hard. The next streak badge you can get is the ${nextBadge} Week Badge. 😉`
}

export const getBadgeUrl = (streak: number) => {
    if (streak >= 16) {
        return 'https://dev.to/badge/16-week-streak'
    } else if (streak >= 8) {
        return 'https://dev.to/badge/8-week-streak'
    } else if (streak >= 4) {
        return 'https://dev.to/badge/4-week-streak'
    } else {
        return ''
    }
}

export const sortArticlesByPublishedDate = (articles: IArticle[]): IArticle[] => (
    articles.sort((article1, article2) => (
        dayjs(article1.published_at).isBefore(article2.published_at) ? 1 : -1
    ))
)

// Assumption - week starts on the Monday
// 23rd December week 1 (Tuesday)
// 30th December week 2 (Tuesday)
// 10th January week 3 (Sunday)

// Streak 16 weeks - 12th April 2021 (A Monday)
// Streak 4 weeks - 17th August 2020 (A Monday)

const calculateWritingStreaks = (articlePublishedDetails: IPublishedWeekYear[]): [IPublishedWeekYear[], IPublishedWeekYear[]] => {
    let streaks = [];
    let currentStreak = [];

    const now = dayjs();

    if (now.week() - 1 > articlePublishedDetails[0].week || now.year() !== articlePublishedDetails[0].year) {
        // If the last post over a week ago, there is no latest streak
        streaks.push([]);
    }

    currentStreak.push(articlePublishedDetails[0])

    for (let i = 1; i < articlePublishedDetails.length; i++) {
        const previousEntryWeek = articlePublishedDetails[i-1].week;
        const week = articlePublishedDetails[i].week;
        const yearsAreSame = articlePublishedDetails[i].year === articlePublishedDetails[i-1].year;

        if (previousEntryWeek === week && yearsAreSame) {
            continue;
        } else if ((previousEntryWeek - week === 1 && yearsAreSame) || week === 52 && previousEntryWeek === 1) {
            currentStreak.push(articlePublishedDetails[i])
        } else {
            streaks.push(currentStreak)
            currentStreak = [articlePublishedDetails[i]];
        }
    }

    // Add final streak into streaks array
    streaks.push(currentStreak);

    const latestStreak = streaks[0];

    const streaksSortedByLongest = streaks.sort((a, b) => a > b ? -1 : 1);
    const longestStreak = streaksSortedByLongest[0];

    return [latestStreak, longestStreak];
}

const getWritingStreaks = (articles?: IArticle[]): [IPublishedWeekYear[], IPublishedWeekYear[]] => {
    if (!articles || articles.length <= 0) {
      return [[], []];
    }

    const sortedArticles = sortArticlesByPublishedDate(articles)

    const articlePublishedDetails: IPublishedWeekYear[] = sortedArticles.map(({ published_at, id }): IPublishedWeekYear => {
        const d = dayjs(published_at);
        const week = d.week();
        // December 30th can be in week 1 of next year
        const year = week === 1 && d.month() === 11 ? d.year() + 1 : d.year();
        return {
            week,
            year,
            published_at,
            id,
        }
    })

    const [latestStreak, longestStreak] = calculateWritingStreaks(articlePublishedDetails);

    return [latestStreak, longestStreak]
  }

export default getWritingStreaks;
