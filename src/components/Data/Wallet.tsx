import React, { ReactElement } from 'react'
import { useUsd } from '../../hooks/useUsd';
import { dollar, sek } from '../../util/currency'
import { useEthBalance } from '../../util/eth';
import DataBox from '../DataBox/DataBox'

interface Props {
	address: string;
	initialUsd: number;
	foreign: number;
}

export default function Wallet({ address, initialUsd, foreign }: Props): ReactElement {
	const usd = useUsd(initialUsd);
	const ethBalance = useEthBalance(address);

	return (
		<DataBox 
			label="Wallet" 
			unit="ETH"
			additionalInfo={[
				`${dollar.format(ethBalance * usd)}`,
				`${sek.format(ethBalance * (usd * foreign))}`
			]}
		>
			{ethBalance}
		</DataBox>
	)
}
