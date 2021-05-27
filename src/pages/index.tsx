import { GetServerSideProps } from "next"

import EthPrice from "../components/Data/EthPrice";
import Unpaid from "../components/Data/Unpaid";
import Wallet from "../components/Data/Wallet";
import AverageHashrate from "../components/Data/AverageHashrate";
import TotalHoldings from "../components/Data/TotalHoldings";
import BinanceCandlestick from "../components/Data/BinanceCandlestick";
import HashrateLineChart from "../components/Data/HashrateLineChart";

import styles from '../styles/Home.module.css'
import { MinerCurrentStats } from "../types/ethermine";
import { BinanceAvgPrice, BinanceKline } from "../types/binance";
import { ExchangeLatest } from "../types/exchangerate";

interface Props{
	ethermine: { data: MinerCurrentStats };
	binance: BinanceAvgPrice;
	currency: ExchangeLatest;
	kline: BinanceKline;
	address: string;
}

export default function Home({ ethermine, binance, currency, kline, address }: Props): JSX.Element {
	return (
		<div className={styles.container}>
			<div className={styles.data}>
				<Unpaid 
					initialPool={ethermine}
					initialUsd={binance.price}
					foreign={currency.rates.SEK}
					address={address} 
				/>
				<Wallet 
					initialUsd={binance.price}
					foreign={currency.rates.SEK}
					address={address}
				/>
				<AverageHashrate 
					initialPool={ethermine}
					address={address}
				/>
				<EthPrice foreign={currency.rates.SEK} initialUsd={binance.price} />
				<TotalHoldings 
					initialPool={ethermine}
					initialUsd={binance.price}
					foreign={currency.rates.SEK}
					address={address}
				/>
			</div>

			<div className={styles.charts}>
				<BinanceCandlestick kline={kline} />
				<HashrateLineChart initialPool={ethermine} address={address} />
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const address = ctx.query.address;
	const [res1, res2, res3, res4] = await Promise.all([
		fetch(`https://api.ethermine.org/miner/${address}/currentStats`),
		fetch("https://api.binance.com/api/v3/avgPrice?symbol=ETHUSDT"),
		fetch("https://api.exchangerate.host/latest?base=usd&symbols=SEK"),
		fetch("https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1m&limit=50")
	]);
	const [ethermine, binance, currency, kline] = await Promise.all([
		res1.json(), 
		res2.json(), 
		res3.json(),
		res4.json()
	])
	return {
		props: {
			ethermine,
			binance,
			currency,
			kline,
			address
		}
	};
}