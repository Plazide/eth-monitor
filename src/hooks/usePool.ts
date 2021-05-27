import { useEffect, useState } from "react";
import { MinerCurrentStats, MinerDashboard, Stat } from "../types/ethermine";
import useSWR from "swr";
import { eth } from "../util/eth";

interface Options{
	address: string;
	defaultData: { data: MinerCurrentStats };
}

interface Current{
	currentHashrate: number | string;
	reportedHashrate: number | string;
	averageHashrate: number | string;
	validShares: number;
	invalidShares: number;
	staleShares: number;
	unpaid: number;
	coinsPerMin: number;
}

export type Statistics = Stat[]

export interface Pool{
	current: Current;
	stats: Statistics;
}

async function fetcher(url: string){
	const res = await fetch(url);
	return res.json();
}

export function usePool(options: Options): Pool{
	const [current, setCurrent] = useState(normalizeData(options.defaultData.data));
	const [stats, setStats] = useState([]);
	const { data, error } = useSWR<MinerDashboard>(
		`https://api.ethermine.org/miner/${options.address}/dashboard`, 
		fetcher, 
		{ refreshInterval: 1000 * 60 }
	);
	const { data: currentData } = useSWR<{ data: MinerCurrentStats }>(
		`https://api.ethermine.org/miner/${options.address}/currentStats`,
		fetcher,
		{ refreshInterval: 1000 * 60 }
	)

	if(error) console.error(error);

	useEffect( () => {
		if(!data) return;

		setStats(normalizeStats(data));
	}, [data]);

	useEffect( () => {
		if(!currentData) return;

		setCurrent(normalizeData(currentData.data));
	}, [currentData]);

	return { current, stats };
}

function normalizeData(data: MinerCurrentStats): Current{
	return{
		/** Current hashrate in MH/s */
		currentHashrate: mh(data.currentHashrate),

		/** Reported hashrate in MH/s */
		reportedHashrate: mh(data.reportedHashrate),

		/** Average hashrate in MH/s */
		averageHashrate: mh(data.averageHashrate),

		validShares: data.validShares,
		invalidShares: data.invalidShares,
		staleShares: data.staleShares,
		unpaid: eth(data.unpaid),
		coinsPerMin: data.coinsPerMin
	}
}

function normalizeStats(data: MinerDashboard): Statistics{
	const stats = data.data.statistics;
	return stats.map( stat => ({
		...stat,
		reportedHashrate: mh(stat.reportedHashrate),
		currentHashrate: mh(stat.currentHashrate)
	}));
}

/** Take a hashrate (H/s) and return the MH/s value */
function mh(hashrate: number): number{
	return parseFloat((hashrate / 1_000_000).toFixed(2));
}