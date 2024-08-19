import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { getOrderStatus } from './getOrdersStatus'

const recentOrderData = [
	{
		id: 'K2023112101',
		batch: '4324',
		customer_id: '23143',
		customer_name: 'Kevindol',
		order_date: '2022-05-17T03:24:00',
		order_qc: '2023-09-15T03:24:00',
		current_order_status: 'Đạt tiêu chuẩn',
		
	},
	{
		id: 'K20231221024',
		batch: '7453',
		customer_id: '96453',
		customer_name: 'Morphini Spinal',
		order_date: '2022-05-14T05:24:00',
		order_qc: '2023-09-15T03:24:00',
		current_order_status: 'Đang chờ',
		
	},
	{
		id: 'K20230911015',
		batch: '5434',
		customer_id: '65345',
		customer_name: 'Vitamin B Complex',
		order_date: '2022-05-17T07:14:00',
		order_qc: '2023-09-15T03:24:00',
		current_order_status: 'Đạt tiêu chuẩn',
	
	},
	{
		id: 'K20230911016',
		batch: '9854',
		customer_id: '87832',
		customer_name: 'Mg-Tan 960ml',
		order_date: '2022-05-16T12:40:00',
		order_qc: '2023-09-15T03:24:00',
		current_order_status: 'Đạt tiêu chuẩn',
		
	},
	{
		id: 'K20230911017',
		batch: '8763',
		customer_id: '09832',
		customer_name: 'Bupivacain Spinal Heavy',
		order_date: '2023-09-14T03:24:00',
		order_qc: '2023-09-15T03:24:00',
		current_order_status: 'Đạt tiêu chuẩn',
		
	},
	{
		id: 'K20230911018',
		batch: '5627',
		customer_id: '97632',
		customer_name: 'Safoli Avisure',
		order_date: '2023-09-12T05:24:00',
		order_qc: '2023-09-15T03:24:00',
		current_order_status: 'Không đạt',
		
	}
]

export default function RecentOrders() {
	return (
		<div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
			<strong className="text-gray-700 font-medium">QC Report</strong>
			<div className="border-x border-gray-200 rounded-sm mt-3">
				<table className="w-full text-gray-700">
					<thead>
						<tr>
							<th style={{ width: '19%' }}>Số K kiểm định</th>
							<th style={{ width: '19%' }}>Product ID</th>
							<th style={{ width: '19%' }}>Name Product</th>
							<th style={{ width: '19%' }}>Production Date</th>
							<th>QC Date</th>
							{/* <th>Shipping Address</th> */}
							<th style={{ width: '20%' }}>QC Status</th>
						</tr>
					</thead>
					<tbody>
						{recentOrderData.map((order) => (
							<tr key={order.id}>
								<td>
									<Link to={`/order/${order.id}`}>{order.id}</Link>
								</td>
								<td>
									<Link to={`/product/${order.batch}`}>#{order.batch}</Link>
								</td>
								<td>
									<Link to={`/customer/${order.customer_id}`}>{order.customer_name}</Link>
								</td>
								<td>{format(new Date(order.order_date), 'dd/MM/yyyy')}</td>
								<td>{format(new Date(order.order_qc), 'dd/MM/yyyy')}</td>
								{/* <td>{order.shipment_address}</td> */}
								<td>{getOrderStatus(order.current_order_status)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
