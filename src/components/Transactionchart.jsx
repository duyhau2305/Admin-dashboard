import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
	{
		name: 'Jan',
		QC_Sample: 4000,
		Failed: 2400
	},
	{
		name: 'Feb',
		QC_Sample: 3000,
		Failed: 1398
	},
	{
		name: 'Mar',
		QC_Sample: 2000,
		Failed: 800
	},
	{
		name: 'Apr',
		QC_Sample: 6780,
		Failed: 3908
	},
	{
		name: 'May',
		QC_Sample: 9890,
		Failed: 4800
	},
	{
		name: 'Jun',
		QC_Sample: 12390,
		Failed: 3800
	},
	{
		name: 'July',
		QC_Sample: 13490,
		Failed: 4300
	},
	{
		name: 'Aug',
		QC_Sample: 22000,
		Failed: 9800
	},
	{
		name: 'Sep',
		QC_Sample: 12780,
		Failed: 3908
	},
	{
		name: 'Oct',
		QC_Sample: 11890,
		Failed: 4800
	},
	{
		name: 'Nov',
		QC_Sample: 21390,
		Failed: 3800
	},
	{
		name: 'Dec',
		QC_Sample: 23490,
		Failed: 4300
	}
]

export default function Transactionchart() {
	return (
		<div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
			<strong className="text-gray-700 font-medium">QC Overview</strong>
			<div className="mt-3 w-full flex-1 text-xs">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 20,
							right: 10,
							left: -10,
							bottom: 0
						}}
					>
						<CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
            <Bar dataKey="QC_Sample" fill="#0ea5e9" />
						<Bar dataKey="Failed" fill="#ea580c" />
						
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
