import { useEffect, useState } from "react";
import { BinanceKline } from "../types/binance";
import { useBinance } from "./useBinance";

interface Options{
	kline: BinanceKline;
}

export type CandleData = {
	x: Date;
	y: number[]
}[]

export function useCandle({ kline }: Options): CandleData{
	const { lastMessage } = useBinance();
	const [candle, setCandle] = useState(kline.map( (item) => ({ 
		x: new Date(item[6]),
		y: [
			parseFloat(item[1]),
			parseFloat(item[2]), 
			parseFloat(item[3]),
			parseFloat(item[4])
		]
	})));

	useEffect( () => {
		if(!lastMessage?.data) return;

		const data = lastMessage?.data;

		if(data && data.e === "kline"){
			const y = [
				parseFloat(data.k.o),
				parseFloat(data.k.h),
				parseFloat(data.k.l),
				parseFloat(data.k.c)
			];
			const x = new Date(data.k.T);
			const entry = { y, x };

			if(x > candle[candle.length - 1].x){
				setCandle([...candle.slice(1), entry]);
			}else{
				const newCandle = [...candle];
				newCandle[newCandle.length - 1] = entry;
				setCandle(newCandle)
			}	
		}
	}, [lastMessage?.data]);

	return candle;
}