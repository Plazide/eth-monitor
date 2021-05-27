import ReactApexChart from "react-apexcharts";
import format from "date-fns/format";

interface Props{
	series: { name: string, data: Record<string, unknown>[] }[];
}

export default function LineChart({ series }: Props): JSX.Element{
	return(
		<ReactApexChart 
			height={300}
			type="line"
			series={series}
			options={{
				chart: {
					id: "line",
					type: "line",
					foreColor: "#CAD2C5",
					height: 300,
				},
				stroke: {
					width: 3,
					dashArray: [4, 0, 2]
				},
				xaxis: {
					type: "datetime",
					labels: {
						formatter: (val) => {
							return format(new Date(parseInt(val) * 1000), "MMM dd HH:mm")
						}
					}
				},
				yaxis: {
					labels: {
						formatter: val => {
							return `${val} MH/s`
						}
					},
					opposite: true
				},
				title: {
					text: "Hashrate",
					align: "center"
				},
				tooltip: {
					theme: "dark"
				}
			}}
		/>
	)
}