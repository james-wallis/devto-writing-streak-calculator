import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import getWritingStreaks from '../../lib/calculateStreak'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method !== 'GET') {
        res.status(405).send('Only GET allowed')
        return
    }

    const { username } = req.query;
    if (!username || username === '') {
        res.status(400).send('"username" query parameter required (e.g. ?username=ben)')
        return
    }

    const { data: articles } = await axios.get(`https://dev.to/api/articles?username=${username}&per_page=1000`)
    const [latestStreak, longestStreak] = getWritingStreaks(articles)
    res.status(200).json({
        latestStreakCount: latestStreak.length,
        longestStreakCount: longestStreak.length,
        latestStreak,
        longestStreak,
    })
}
