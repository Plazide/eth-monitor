import React, { ReactElement } from 'react'

import styles from "./news.module.css";

interface Props {
	title: string;
	url: string;
	positive: number;
	negative: number;
	postedAt: Date;
}

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = week * 4;
const year = month * 12;

export default function Post({ title, url, postedAt, positive, negative }: Props): ReactElement {
	const timeSincePublish = formatElapsedTime(postedAt.getTime());
	const positivePercent = positive / (positive + negative) * 100 || 0;

	return (
		<li className={styles.post}>
			<article>
				<a className={styles.title} href={url} target="__blank" rel="noreferrer">{title}</a>
				<div className={styles.meta}>
					<span className={styles.published}>
						{timeSincePublish}
					</span>
					<div className={styles.sentiment} title={`${Math.round(positivePercent)}% positive`}>
						<div 
							className={styles.positive} 
							style={{ width: positivePercent + "%" }}
						></div>
					</div>
				</div>
			</article>
		</li>
		
	)
}

function formatElapsedTime(time: number): string{
	const now = Date.now();
	const diff = time - now;
	const relative = new Intl.RelativeTimeFormat("en-US", { style: "long", numeric: "auto" })

	switch(true){
	case (diff >= year):
		return relative.format(Math.round(diff / year), "years")
	case (diff >= month):
		return relative.format(Math.round(diff / month), "months")
	case (diff >= week):
		return relative.format(Math.round(diff / week), "weeks")
	case (diff >= day):
		return relative.format(Math.round(diff / day), "days")
	case (diff <= hour):
		return relative.format(Math.round(diff / hour), "hours")
	case (diff <= minute):
		return relative.format(Math.round(diff / minute), "minutes")
	case (diff <= second):
		return relative.format(Math.round(diff / second), "seconds")
	}
}