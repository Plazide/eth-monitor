import { useEffect, useState } from "react";
import { useBinance } from "./useBinance";

export function useUsd(initial: number): number{
	const { lastMessage } = useBinance();
	const [usd, setUsd] = useState(initial)

	useEffect( () => {
		if(!lastMessage?.data) return;

		const data = lastMessage?.data;

		if(data && data.e === "aggTrade")
			setUsd(parseFloat(data.p));

	}, [lastMessage?.data])

	return usd;
}