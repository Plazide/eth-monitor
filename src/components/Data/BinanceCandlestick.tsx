import dynamic from "next/dynamic"
import React, { ReactElement } from 'react'
import { useCandle } from '../../hooks/useCandle'
import { BinanceKline } from "../../types/binance";

const Candlestick = dynamic( () => import("../Charts/Candlestick"), { ssr: false });

interface Props {
	kline: BinanceKline;
}

export default function BinanceCandlestick({ kline }: Props): ReactElement {
	const candle = useCandle({ kline })

	return (
		<div>
			{
				typeof window !== "undefined"
					? <Candlestick data={candle} />
					: null
			}
		</div>
	)
}
