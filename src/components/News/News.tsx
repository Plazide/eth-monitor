import React, { ReactElement } from 'react'
import useSWR from 'swr'
import { NewsResponse } from '../../types/news';
import Post from './Post';

import styles from "./news.module.css";

export default function News(): ReactElement {
	const { data, error } = useSWR<NewsResponse>(
		`/api/news?coin=ETH`,
		{ refreshInterval: 1000 * 60 * 5 }
	);

	if(error) console.error(error);

	return (
		<ul className={styles.news}>
			<h2>Latest ETH news</h2>
			{data ? data.results.map( post => (
				<Post 
					title={post.title}
					url={post.url}
					positive={post.votes.positive}
					negative={post.votes.negative}
					postedAt={new Date(post.published_at)}
					key={post.id}
				/>
			)) : null}
		</ul>
	)
}
