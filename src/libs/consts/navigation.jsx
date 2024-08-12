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
	HiOutlineFolder

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
		{ key: 'Baocaoca', label: 'Báo cáo ca', path: '/products/product3' ,
		}
	  ]
	},
	{
	  key: 'qa',
	  label: 'QA ',
	  path: '/qa',
	  icon: <HiDesktopComputer />,
	  subMenu: [
		{ key: 'DanhMucNL', label: 'Danh Mục NL', path: '/qa/danhmucnguyenlieu' ,
		},
		{ key: 'Nlthaythe', label: 'NL Thay Thế', path: '/qa/nguyenlieuthaythe' ,
		},
		{ key: 'SodangkyNl', label: 'Số đăng ký', path: '/qa/sodangky' ,
		},
		{ key: 'PhieukiemnghiemNL', label: 'Phiếu kiểm nghiệm', path: '/qa/phieukiemnghiemnguyenlieu' ,
		}
	  
	  ]
	},
	{
	  key: 'qc',
	  label: 'QC ',
	  path: '/qc',
	  icon: <HiOutlineDocumentReport />,
	  subMenu: [
		{ key: 'qlpl', label: 'Quản lý PL', path: '/qc/qlpl' ,
			subMenu: [
				 { key: 'dmpl', label: 'Danh mục PL', path: '/qc/qlpl/dmpl',
				 },
				 { key: 'maupl', label: 'Lấy mẫu PL', path: '/qc/qlpl/maupl',
				 },
				 { key: 'phieukiemnghiem', label: 'Phiếu kiểm nghiệm', path: '/qc/qlpl/phieukiemnghiem',
				 },
			]
		},
		{ key: 'qlnl', label: 'Quản lý NL', path: '/qc/qlnl' ,
			subMenu: [
				{ key: 'dmnl', label: 'Danh mục NL', path: '/qc/qlnl/dmnl',
				},
				{ key: 'maunl', label: 'Lấy mẫu NL', path: '/qc/qlpl/maunl',
				},
				{ key: 'phieukiemnghiem', label: 'Phiếu kiểm nghiệm', path: '/qc/qlnl/phieukiemnghiem',
				},
		   ]
		},
		{ key: 'quanlyhc', label: 'Quản lý HC', path: '/qc/qlhc',
			subMenu: [
				{ key: 'dmhc', label: 'Danh mục HC', path: '/qc/qlhc/dmhc',
				},
				{ key: 'mauhc', label: 'Lấy mẫu HC', path: '/qc/qlhc/mauhc',
				},
				{ key: 'phieukiemnghiem', label: 'Phiếu kiểm nghiệm', path: '/qc/qlnl/phieukiemnghiem',
				},
		   ]
		},
		{ key: 'qltp', label: 'Quản lý TP', path: '/qc/qltp' ,
			subMenu: [
				{ key: 'dmtp', label: 'Danh mục TP', path: '/qc/qltp/dmtp',
				},
				{ key: 'mautp', label: 'Lấy mẫu TP', path: '/qc/qltp/mautp',
				},
				{ key: 'phieukiemnghiem', label: 'Phiếu kiểm nghiệm', path: '/qc/qltp/phieukiemnghiem',
				},
		   ]
		}
	  ]
	},
	{
	  key: 'timesheets',
	  label: 'Chấm công ',
	  path: '/timesheets',
	  icon: <HiOutlineDocumentText />,
	  subMenu: [
		{ key: 'timesheet', label: 'Danh sách chấm công', path: '/timesheets/timesheet',
					
		},
	   { key: 'dklv', label: 'Đăng ký làm việc', path: '/timesheets/dangkylamviec' ,
	   },
	   { key: 'dangkythemgio', label: 'Đăng ký làm thêm giờ', path: '/timesheets/dangkythemgio' ,
	   }
	  ]
	},

	{
	  key: 'messages',
	  label: 'Tin tức nội bộ',
	  path: '/messages',
	  icon: <HiOutlineAnnotation />,
	  subMenu: []
	},
	{
		key: 'admin',
		label: 'Quản lý hệ thống',
		path: '/admin',
		icon: <HiOutlineFolder />,
		subMenu: [			
				{ key: 'user', label: 'Quản lý tài khoản', path: '/admin/userlist',
					
				 },
				{ key: 'tintuc', label: 'Quản lý tin tức', path: '/admin/managenews' ,
				},
				{ key: 'helpandsupport', label: 'Quản lý hỗ trợ', path: '/admin/managehelpandsupport' ,
				}
			  
		]
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
  