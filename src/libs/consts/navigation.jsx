import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiDesktopComputer,
	HiOutlineDocumentReport,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog,
	HiMenu,

  } from 'react-icons/hi'
  
  export const DASHBOARD_SIDEBAR_LINKS = [
	{
	  key: 'dashboard',
	  label: 'Trang chủ',
	  path: '/',
	  icon: <HiOutlineViewGrid />,
	  subMenu: []
	},
	{
	  key: 'products',
	  label: 'Sản xuất',
	  path: '/products',
	  icon: <HiOutlineCube />,
	  subMenu: [
		{ key: 'lenhsanxuat', label: 'Lệnh sản xuất', path: '/products',
			
		 },
		{ key: 'LinhNL', label: 'Kiểm tra NL', path: '/products/product2' ,
		},
		{ key: 'Baocaoca', label: 'Báo cáo ca', path: '/products/product2' ,
		}
	  ]
	},
	{
	  key: 'qatool',
	  label: 'QA ',
	  path: '/qatool',
	  icon: <HiDesktopComputer />,
	  subMenu: [
		{ key: 'DanhMucNL', label: 'Danh Mục NL', path: '/products/product2' ,
		},
		{ key: 'Nlthaythe', label: 'NL Thay Thế', path: '/products/product2' ,
		},
		{ key: 'SodangkyNl', label: 'Số đăng ký', path: '/products/product2' ,
		},
		{ key: 'PhieukiemnghiemNL', label: 'Phiếu kiểm nghiệm', path: '/products/product2' ,
		}
	  
	  ]
	},
	{
	  key: 'qcreport',
	  label: 'QC ',
	  path: '/qcreport',
	  icon: <HiOutlineDocumentReport />,
	  subMenu: []
	},
	{
	  key: 'standard',
	  label: 'Chấm công ',
	  path: '/standard',
	  icon: <HiOutlineDocumentText />,
	  subMenu: []
	},
	{
	  key: 'messages',
	  label: 'Tin tức nội bộ',
	  path: '/messages',
	  icon: <HiOutlineAnnotation />,
	  subMenu: []
	}
  ]
  
  export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
	  key: 'settings',
	  label: 'Cài Đặt',
	  path: '/settings',
	  icon: <HiOutlineCog />,
	  subMenu: []
	},
	{
	  key: 'support',
	  label: 'Hỗ trợ',
	  path: '/support',
	  icon: <HiOutlineQuestionMarkCircle />,
	  subMenu: []
	},
	{
	  key: 'profile',
	  label: 'Thông tin cá nhân',
	  path: '/profile',
	  icon: <HiMenu />,
	  subMenu: []
	}
  ]
  