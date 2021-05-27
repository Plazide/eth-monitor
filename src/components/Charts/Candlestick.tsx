import React, { ReactElement } from 'react'
import ReactApexChart from "react-apexcharts";
import format from "date-fns/format";
import { CandleData } from '../../hooks/useCandle';

interface Props {
	data: CandleData;
}

export default function Candlestick({ data }: Props): ReactElement {
	return (
		<div>
			<ReactApexChart 
				options={{
					chart: {
						id: "candlestick",
						height: 500,
						type: "candlestick",
						foreColor: "#CAD2C5"
					},
					title: {
						text: "ETH/USD",
						align: "center"
					},
					xaxis: {
						type: "datetime",
						labels: {
							formatter: (val) => {
								return format(new Date(val), "MMM dd HH:mm")
							}
						}
					},
					yaxis: {
						labels: {
							formatter: val => `$${val}`
						},
						opposite: true
					},
					tooltip: {
						theme: "dark"
					}
				}} 
				series={[
					{
						name: "candle",
						data
					}
				]} 
				type="candlestick"
				height={400} 
			/>
		</div>
	)
}
