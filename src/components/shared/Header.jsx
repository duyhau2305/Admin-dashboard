import { Popover, Transition,Menu } from '@headlessui/react'
import React, {Fragment} from 'react'
import { HiOutlineBell, HiOutlineChatAlt, HiOutlineSearch } from 'react-icons/hi'
import classNames  from 'classnames'
import { useNavigate } from 'react-router-dom'

function Header() {
	const nagvigate =useNavigate();
  return (
    <div className=" bg-neutral-100 h-16 px-4 flex justify-between items-center">
        <div className="relative">
            <HiOutlineSearch fontSize={22} className="text-gray-400 absolute top-1/2 -translate-y-1/2 right-1 cursor-pointer"/>
            <input type="text" 
            placeholder="Search......" 
            className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm px-4" />
        </div>
        <div className="flex gap-2 items-center mr-2">
        <Popover className="relative">
					{({ open }) => (
						<>
							<Popover.Button
								className={classNames(
									open && 'bg-gray-100',
									'group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100'
								)}
							>
								<HiOutlineChatAlt fontSize={24} />
							</Popover.Button>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel className="absolute right-0 z-10 mt-2.5 transform w-80">
									<div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
										<strong className="text-gray-700 font-medium">Messages</strong>
										<div className="mt-2 py-1 text-sm">Vũ Thị Hoa đã nhắn tin cho bạn.</div>
									</div>
								</Popover.Panel>
							</Transition>
						</>
					)}
				</Popover>
				<Popover className="relative">
					{({ open }) => (
						<>
							<Popover.Button
								className={classNames(
									open && 'bg-gray-100',
									'group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100'
								)}
							>
								<HiOutlineBell fontSize={24} />
							</Popover.Button>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-200"
								enterFrom="opacity-0 translate-y-1"
								enterTo="opacity-100 translate-y-0"
								leave="transition ease-in duration-150"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-1"
							>
								<Popover.Panel className="absolute right-0 z-10 mt-2.5 transform w-80">
									<div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
										<strong className="text-gray-700 font-medium">Notification</strong>
										<div className="mt-2 py-1 text-sm">Đề nghị tất cả qc nhập đúng trường dữ liệu.</div>
									</div>
								</Popover.Panel>
							</Transition>
						</>
					)}
				</Popover>
				<Menu as="div" className="relative inline-block text-left">
					<div className="inline-flex">
						<Menu.Button className="ml-2 inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
								<span className="sr-only">Open user</span>
								<div className = "h-10 w-10 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" >
									<span className="sr-only">Huge Kacok</span>
								</div>
						</Menu.Button>
					</div>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-opacity-5 focus:outline-none">
									
										<Menu.Item>
											{({ active }) => (
												<div 
													className={classNames(active && 'bg-gray-100', 
													'text-gray-700', 'cursor-pointer', 'rounded-sm','px-4','py-2')}
													onClick={()=>nagvigate('/profile')}>
													Your Profile
												</div>
											
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<div 
													className={classNames(active && 'bg-gray-100', 
													'text-gray-700', 'cursor-pointer', 'rounded-sm','px-4','py-2')}
													onClick={()=>nagvigate('/settings')}>
													Settings
												</div>
											
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<div 
													className={classNames(active && 'bg-gray-100', 
													'text-gray-700', 'cursor-pointer', 'rounded-sm','px-4','py-2')}
													onClick={()=>nagvigate('/login')}>
													Log Out
												</div>
											
											)}
										</Menu.Item>
										
									
								</Menu.Items>
			  		</Transition>
				</Menu>
        
            
            
        </div>
    </div>
  )
}

export default Header