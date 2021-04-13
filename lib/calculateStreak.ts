import dayjs from 'dayjs';
import IArticle from '../interfaces/IArticle';
import en from 'dayjs/locale/en';
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

const createMessage = (streak: number) => {
    if (streak >= LONGEST_STREAK_WEEKS) {
        return `${streak} ${LONGEST_STREAK_TEMPLATE}`;
    }
    let nextBadge = 4;
    if (streak >= 4 && streak < 8) {
        nextBadge = 8;
    } else if (streak >= 8) {
        nextBadge = 16;
    }
    return `Congrats on achieving a ${streak} week streak! Consistent writing is hard. The next streak badge you can get is the ${nextBadge} Week Badge. 😉`
}

// Assumption - week starts on the Monday
// 23rd December week 1 (Tuesday)
// 30th December week 2 (Tuesday)
// 10th January week 3 (Sunday)

// Streak 16 weeks - 12th April 2021 (A Monday)
// Streak 4 weeks - 17th August 2020 (A Monday)


const calculateStreak = (articles?: IArticle[]): [number, string] => {
    if (!articles || articles.length < 0) {
      return [0, ''];
    }

    const sortedArticles = articles.sort((article1, article2) => (
      dayjs(article1.published_at).isBefore(article2.published_at) ? 1 : -1
    ))

    const articleWeeks = [... new Set(sortedArticles.map(({ published_at }) => (dayjs(published_at).week())))]
    let count = 1;

    for (let i = 1; i < articleWeeks.length; i++) {
        if (articleWeeks[i-1] - articleWeeks[i] === 1 || articleWeeks[i] === 52 && articleWeeks[i-1] === 1) {
            count++;
        } else {
            break
        }
    }
    return [count, createMessage(count)]

    // sortedArticles.forEach((article, i) => {
    //   const oneWeekBeforeArticlePublishDate = dayjs(article.published_at).subtract(1, 'week');
    //   if (i < articles.length -1 && oneWeekBeforeArticlePublishDate.isBefore(articles[i+1].published_at)) {
    //     count++;
    //   } else {
    //       return
    //   }
    // })

    // for (let i = 0; i < articles.length; i++) {
    //     const article = articles[i];
    //     const oneWeekBeforeArticlePublishDate = dayjs(article.published_at).subtract(1, 'week').subtract(1, 'day').hour(0).minute(0);
    //     console.log(article.published_at, oneWeekBeforeArticlePublishDate.toISOString(), articles[i+1].published_at);
    //     console.log(oneWeekBeforeArticlePublishDate.isBefore(articles[i+1].published_at));
    //     if (i < articles.length -1 && oneWeekBeforeArticlePublishDate.isBefore(articles[i+1].published_at)) {
    //         count++;
    //     } else {
    //         break
    //     }
    // }

    // if (count > sortedArticles.length || !sortedArticles[count] || !sortedArticles[count].published_at) {
    //   return [0, ''];
    // }

    // console.log(sortedArticles, count, sortedArticles[count].published_at);
    // console.log(Math.round(dayjs().diff(sortedArticles[count].published_at, 'week', true)))
    // const streak = Math.round(dayjs().diff(sortedArticles[count].published_at, 'week', true));
    // return [streak, createMessage(streak)]
  }

export default calculateStreak;
