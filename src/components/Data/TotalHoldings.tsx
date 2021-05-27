import React, { ReactElement } from 'react'
import { usePool } from '../../hooks/usePool'
import { useUsd } from '../../hooks/useUsd'
import { MinerCurrentStats } from '../../types/ethermine'
import { dollar, sek } from '../../util/currency'
import { useEthBalance } from '../../util/eth'
import DataBox from '../DataBox/DataBox'

interface Props {
	initialUsd: number;
	initialPool: { data: MinerCurrentStats };
	foreign: number;
	address: string;
}

export default function TotalHoldings({ initialUsd, initialPool, address, foreign }: Props): ReactElement {
	const pool = usePool({ defaultData: initialPool, address });
	const ethBalance = useEthBalance(address);
	const usd = useUsd(initialUsd)

	return (
		<DataBox
			label="Total holdings"
			unit="ETH"
			additionalInfo={[
				dollar.format(usd * (ethBalance + pool.current.unpaid)),
				sek.format((usd * foreign) * (ethBalance + pool.current.unpaid))
			]}
		>
			{ethBalance + pool.current.unpaid}
		</DataBox>
	)
}
