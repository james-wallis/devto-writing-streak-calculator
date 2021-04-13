import axios from 'axios';
import dayjs from 'dayjs';
import useSWR from 'swr'
import relativeTime from 'dayjs/plugin/relativeTime'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { useState } from 'react';
import calculateStreak from '../lib/calculateStreak';
import IArticle from '../interfaces/IArticle';
import UsernameForm from '../components/usernameForm';
import DisplayStreakMessage from '../components/displayStreakMessage';
import IUser from '../interfaces/IUser';
import Header from '../components/header';

dayjs.extend(relativeTime)
dayjs.extend(weekOfYear)

const fetcher = (url: string) => axios.get(url).then(res => res.data)

const IndexPage = () => {
  const [username, setUsername] = useState('');

  const { data: user } = useSWR<IUser, Error>(username ? `https://dev.to/api/users/by_username?url=${username}` : null, fetcher)
  const { data: articles } = useSWR<IArticle[], Error>(username ? `https://dev.to/api/articles?username=${username}&per_page=1000` : null, fetcher)
  const [latestStreak] = calculateStreak(articles)


  const loading = (articles === undefined && user === undefined) && username !== '';
  return (
    <div className="w-screen min-h-screen	flex items-center flex-col px-5 bg-body pb-4">
      <Header user={user} />
      <h1 className="text-3xl md:text-4xl font-semibold mt-6 md:mt-24 text-center">Dev.to Writing Streak Calculator (unofficial)</h1>
      <div className="container py-6 md:py-24 mx-auto flex flex-wrap items-center justify-between max-w-site">
        <UsernameForm onSubmit={setUsername} />
        <DisplayStreakMessage streak={latestStreak} loading={loading} pendingUsernameEntry={username === ''} unknownUser={!user} />
      </div>
    </div>
  )
}

export default IndexPage
