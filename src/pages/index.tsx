import React, { ReactElement } from 'react';
import { useRouter } from "next/router";

import styles from "../styles/Home.module.css";
import { connectToWallet } from '../util/eth';

export default function Home(): ReactElement {
	const router = useRouter();

	async function handleClick(){
		const accounts = await connectToWallet();
		const account = accounts[0];

		router.push("/" + account);
	}

	return (
		<div className={styles.container}>
			<div className={styles.copy}>
				<h1>Know what your ETH is worth, <br/> in real-time</h1>
				<p>Monitor the value of your unpaid ETH, as well as your wallet balance. See the value in both USD and your local currency (currently only SEK).</p>
			</div>

			<button onClick={handleClick}>Connect with Wallet</button>
		</div>
		
	)
}
