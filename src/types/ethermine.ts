export interface MinerCurrentStats{
	/** Unix timestamp of the statistic entry */
	time: number;

	/** Unix timestamp of when the miner was last seen by the pool */
	lastSeen: number;

	/** Reported hashrate of the miner in H/s */
	reportedHashrate: number;

	/** Average hashrate of the miner in H/s during the last 24h */
	averageHashrate: number;

	/** Current hashrate of the miner in H/s */
	currentHashrate: number;

	/** Valid shares */
	validShares: number;

	/** Invalid shares */
	invalidShares: number;

	/** Stale shares */
	staleShares: number;

	/** Currently active workers of the miner */
	activeWorkers: number;

	/** Unpaid balance */
	unpaid: number;

	/** Unconfirmed balance (in base units) of the miner */
	unconfirmed: number;

	/** Estimated number of coins mined per minute (based on your average hashrate as well as the average block time and difficulty of the network over the last 24 hours.) */
	coinsPerMin: number;

	/** Estimated number of USD mined per minute (based on your average hashrate as well as the average block time and difficulty of the network over the last 24 hours.) */
	usdPerMin: number;

	/** Estimated number of BTC mined per minute (based on your average hashrate as well as the average block time and difficulty of the network over the last 24 hours.) */
	btcPerMin: number;
}

export interface Stat{
	/** Unix timestamp of the statistic entry */
	time: number;

	/** Reported hashrate of the miner in H/s */
	reportedHashrate: number;

	/** Current hashrate of the miner in H/s */
	currentHashrate: number;

	/** Valid shares */
	validShares: number;

	/** Invalid shares */
	invalidShares: number;

	/** Stale shares */
	staleShares: number;
}

export interface MinerDashboard{
	data: {
		statistics: (Stat & {

			/** Currently active workers of the miner */
			activeWorkers: number;
		})[]
		workers: (Stat & {
			/** Worker name */
			worker: string;

			/** Unix timestamp of when the worker was last seen by the pool */
			lastSeen: number;
		})[],
		currentStatistics: Stat & MinerCurrentStats,
		settings: {
			/** Masked Email address of the miner */
			email: string;

			/** Monitoring enabled (1 for yes, 0 for no) */
			monitor: number;

			/** Minimum payout amount defined by the miner in base units */
			minPayout: number;
		}[]
	}
}