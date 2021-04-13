import axios from 'axios';
import dayjs from 'dayjs';
import useSWR from 'swr'
import IArticle from '../interfaces/IArticle';
import relativeTime from 'dayjs/plugin/relativeTime'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { useState } from 'react';
import calculateStreak from '../lib/calculateStreak';

dayjs.extend(relativeTime)
dayjs.extend(weekOfYear)

const fetcher = (url: string) => axios.get(url).then(res => res.data)

const IndexPage = () => {
  const [username, setUsername] = useState('');
  const [formUsername, setFormUsername] = useState('');


  const { data } = useSWR<IArticle[], Error>(username ? `https://dev.to/api/articles?username=${username}&per_page=1000` : null, fetcher)
  const [, message] = calculateStreak(data)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsername(formUsername)
  }

  return (
    <div>
      <h1>Dev.to Streak Calculator (unofficial)</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={formUsername} onChange={(e) => setFormUsername(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {username && data ? (
        <div>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <p>Enter your username to see your current streak</p>
        </div>
      )}
    </div>
  )
}

export default IndexPage
