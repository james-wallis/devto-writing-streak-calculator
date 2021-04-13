import IPublishedWeekYear from '../interfaces/IPublishedWeekYear';
import { createStreakMessage, getBadgeUrl } from '../lib/calculateStreak';

interface IProps {
    streak: IPublishedWeekYear[]
    loading: boolean
    pendingUsernameEntry: boolean
    unknownUser: boolean
}

const DisplayStreakMessage = ({ streak, loading, pendingUsernameEntry, unknownUser }: IProps) => {
    let message = createStreakMessage(streak.length)
    let badgeUrl = getBadgeUrl(streak.length)

    if (pendingUsernameEntry) {
        message = 'Enter your username to get started.'
    } else if (loading) {
        message = 'Loading...'
    } else if (unknownUser) {
        message = 'The username does not exist'
    }

    return (
        <div>
            <h3 className="title-font font-medium text-3xl text-gray-900">Your current streak</h3>
            <p className="leading-relaxed mt-4">{message}</p>
            {badgeUrl && (
                <a
                    href={badgeUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-link pt-2 block text-sm"
                >
                    Related writing streak badge on Dev.to (if you haven't been awarded this, expect it soon!)
                </a>
            )}
        </div>
    )
}

export default DisplayStreakMessage;
