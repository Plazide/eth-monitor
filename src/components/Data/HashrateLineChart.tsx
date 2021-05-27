import dynamic from "next/dynamic";
import React, { ReactElement } from 'react'
import { usePool } from "../../hooks/usePool";
import { MinerCurrentStats } from "../../types/ethermine";

const LineChart = dynamic( () => import("../Charts/LineChart"), { ssr: false })

interface Props {
	initialPool: { data: MinerCurrentStats };
	address: string;
}

export default function HashrateLineChart ({ initialPool, address }: Props): ReactElement {
	const pool = usePool({ defaultData: initialPool, address });

	return (
		<div>
			{
				typeof window !== "undefined" && pool.stats.length > 0
					? <LineChart 
						series={[
							{
								name: "Current Hashrate",
								data: pool.stats.map( stat => ({
									x: stat.time,
									y: stat.currentHashrate
								}))
							},
							{
								name: "Reported Hashrate",
								data: pool.stats.map( stat => ({
									x: stat.time,
									y: stat.reportedHashrate
								}))
							}
						]}
					/>
					: null
			}
		</div>
	)
}
