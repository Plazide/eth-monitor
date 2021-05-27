import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import { useRouter } from "next/router";

import styles from "../styles/Home.module.css";

export default function Home(): ReactElement {
	const [address, setAddress] = useState("");
	const router = useRouter();

	function onChange(e: ChangeEvent<HTMLInputElement>){
		const value = e.currentTarget.value;
		setAddress(value);
	}

	function handleSubmit(e: FormEvent){
		e.preventDefault();

		router.push("/" + address);
	}

	return (
		<div className={styles.container}>
			<div className={styles.copy}>
				<h1>Know what your ETH is worth, <br/> in real-time</h1>
				<p>Monitor the value of your unpaid ETH, as well as your wallet balance. See the value in both USD and your local currency (currently only SEK).</p>
			</div>
			<form action="address" onSubmit={handleSubmit} className={styles.form}>
				<label htmlFor="address">Enter miner address</label>
				<input id="address" name="address" value={address} onChange={onChange} placeholder="0x35bB09d9180b520B5b8f5e5B86Cc595DDA4cA0C7" />
				<button>Let's go!</button>
			</form>
		</div>
		
	)
}
