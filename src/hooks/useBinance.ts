import { useEffect } from "react";
import useWebsocket from "react-use-websocket";
import { WSAggTrade, WSKline } from "../types/binance";

type WSEvent = WSAggTrade | WSKline;

export function useBinance(): { lastMessage: MessageEvent<WSEvent> }{
	const { lastJsonMessage, sendJsonMessage } = useWebsocket("wss://stream.binance.com/stream", { share: true });

	useEffect( () => {
		sendJsonMessage({
			method: "SUBSCRIBE",
			params: [
				"ethusdt@aggTrade",
				"ethusdt@kline_1m"
			],
			id: 1
		})
	}, [])

	return { lastMessage: lastJsonMessage };
}