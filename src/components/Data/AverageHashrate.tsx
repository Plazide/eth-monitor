import React, { ReactElement } from 'react'
import { usePool } from '../../hooks/usePool'
import { MinerCurrentStats } from '../../types/ethermine'
import DataBox from '../DataBox/DataBox'

interface Props {
	initialPool: { data: MinerCurrentStats };
	address: string;
}

export default function AverageHashrate({ initialPool, address }: Props): ReactElement {
	const pool = usePool({ defaultData: initialPool, address })

	return (
		<DataBox
			label="Average hashrate"
			unit="MH/s"
			additionalInfo={[
				`current ${pool.current.currentHashrate} MH/s`
			]}
		>
			{pool.current.averageHashrate}
		</DataBox>
	)
}
