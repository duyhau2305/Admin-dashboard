export function getOrderStatus(status) {
	switch (status) {
		case 'Đạt tiêu chuẩn':
			return (
				<span className="capitalize w-full	justify-center py-1 flex rounded-md text-xs text-green-500 bg-sky-100">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		case 'Đang chờ':
			return (
				<span className="capitalize w-full	justify-center py-1 flex rounded-md  text-xs text-orange-600 bg-orange-100">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		case 'Không đạt':
			return (
				<span className="capitalize w-full	justify-center py-1 flex rounded-md  text-xs text-red-500 bg-rose-200">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		
		default:
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
	}
}
