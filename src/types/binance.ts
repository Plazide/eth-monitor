interface WebsocketEvent{
	/** Event type */
	e: "kline" | "aggTrade";

	/** Event time */
	E: number;

	/** Symbol */
	s: "ETHUSDT"
}

export interface WSAggTrade extends WebsocketEvent{
	e: "aggTrade";

	/** Aggregate trade id */
	a: number;

	/** Price */
	p: string;

	/** Quantity */
	q: string;

	/** First trade ID */
	f: number;

	/** Last trade ID */
	l: number;

	/** Is the buyer the market maker? */
	m: boolean;

	/** Ignore */
	M: boolean;
}

export interface WSKline extends WebsocketEvent{
	e: "kline";
	k: {
		/** Kline start time */
		t: number;

		/** Kline close time */
		T: number;

		/** Symbol */
		s: string;

		/** Interval (1m, 5m 15m, etc...) */
		i: string;

		/** First trade ID */
		f: number;

		/** Last trade ID */
		L: number;

		/** Open price */
		o: string;

		/** Close price */
		c: string;

		/** High price */
		h: string;

		/** Low price */
		l: string;

		/** Base asset volume */
		v: string;

		/** Number of trades */
		n: number;

		/** Is this kline closed? */
		x: boolean;

		/** Quote asset volume */
		q: string;

		/** Taker buy base asset volume */
		V: string;

		/** Taker buy quote asset volume */
		Q: string;

		/** Ignore */
		B: string;
	}
}

export interface BinanceAvgPrice{
	mins: number;
	price: number;
}

export type BinanceKline = [
	/** Open time */
	number,

	/** Open */
	string,

	/** High */
	string,

	/** Low */
	string,

	/** Close */
	string,

	/** Volume */
	string,

	/** Close time */
	number,

	/** Quote asset volume */
	string,

	/** Number of trades */
	number,

	/** Taker buy base asset volume */
	string,

	/** Taker buy quote asset volume */
	string,

	/** Ignore */
	string
][]