import React, { ReactElement } from 'react'
import DataBox from "../DataBox/DataBox";

import { dollar, sek } from "../../util/currency";
import { useUsd } from '../../hooks/useUsd';

interface Props {
	foreign: number;
	initialUsd: number;
}

export default function EthPrice({ foreign, initialUsd }: Props): ReactElement {
	const usd = useUsd(initialUsd);

	return (
		<DataBox
			label="Value of ETH"
			unit="USD"
			additionalInfo={[
				sek.format(usd * foreign)
			]}
		>
			{dollar.format(usd)}
		</DataBox>
	)
}
