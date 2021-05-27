import React, { ReactElement } from 'react'
import DataBox from '../DataBox/DataBox'

import { dollar, sek } from "../../util/currency";
import { useUsd } from '../../hooks/useUsd';
import { usePool } from "../../hooks/usePool";
import { MinerCurrentStats } from '../../types/ethermine';

interface Props {
	initialPool: { data: MinerCurrentStats };
	initialUsd: number;
	foreign: number;
	address: string;
}

export default function Unpaid({ initialUsd, initialPool, foreign, address }: Props): ReactElement {
	const usd = useUsd(initialUsd);
	const pool = usePool({ defaultData: initialPool, address })

	return (
		<DataBox 
			label="Unpaid" 
			unit="ETH"
			additionalInfo={[
				`${dollar.format(pool.current.unpaid * usd)}`,
				`${sek.format(pool.current.unpaid * (usd * foreign))}`
			]}
		>
			{pool.current.unpaid}
		</DataBox>
	)
}
