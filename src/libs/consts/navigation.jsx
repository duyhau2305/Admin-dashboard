import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiDesktopComputer,
	HiOutlineDocumentReport,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
	HiMenu
    
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'products',
		label: 'Products',
		path: '/products',
		icon: <HiOutlineCube />
	},
	{
		key: 'qctool',
		label: 'QC Tool',
		path: '/qctool',
		icon: <HiDesktopComputer />
	},
	{
		key: 'qcreport',
		label: 'QC Report',
		path: '/qcreport',
		icon: <HiOutlineDocumentReport />
	},
	{
		key: 'standard',
		label: 'Standard ',
		path: '/standard',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'messages',
		label: 'Messages',
		path: '/messages',
		icon: <HiOutlineAnnotation />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	},
	{
		key: 'profile',
		label: 'Profile',
		path: '/profile',
		icon: <HiMenu />
	}
    
]