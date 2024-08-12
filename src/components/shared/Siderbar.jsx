import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineLogout, HiChevronDown, HiChevronRight } from 'react-icons/hi';
import { FcBiotech } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../../libs/consts/navigation';

function Sidebar() {
    const navigate = useNavigate();

    return (
        <div className="flex bg-neutral-800 flex-col w-66 h-screen p-2 text-white overflow-y-auto flex-shrink: 0">
            <div className="flex gap-2 items-center px-2 py-2">
                <FcBiotech fontSize={22} />
                <span className="text-neutral-100 text-lg px-8">Win Pharma</span>
            </div>
            <div className="flex flex-1 py-10 px-2 flex-col gap-2">
                {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
            </div>
            <div className="w-full px-2">
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
                <div className="text-red-500 cursor-pointer flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 active:bg-neutral-600 rounded-sm text-base" onClick={() => navigate('/login')}>
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Log Out
                </div>
            </div>
        </div>
    );
}

function SidebarLink({ item }) {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const hasSubMenu = item.subMenu && item.subMenu.length > 0;

    const handleSubMenuToggle = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    };

    return (
        <>
            <div
                className={`
                    text-white
                    flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 active:bg-neutral-600 rounded-sm text-base cursor-pointer
                    ${hasSubMenu ? 'flex items-center justify-between' : ''}
                `}
                onClick={hasSubMenu ? handleSubMenuToggle : undefined}
            >
                <Link to={item.path} className="flex items-center gap-2 w-full hover:no-underline hover:text-white">
                    <span className="text-xl">{item.icon}</span>
                    {item.label}
                </Link>
                {hasSubMenu && (
                    <span className="text-xl">
                        {isSubMenuOpen ? <HiChevronDown /> : <HiChevronRight />}
                    </span>
                )}
            </div>
            {hasSubMenu && isSubMenuOpen && (
                <div className="pl-8 flex flex-col gap-2">
                    {item.subMenu.map((subItem) => (
                        <SidebarLink key={subItem.key} item={subItem} />
                    ))}
                </div>
            )}
        </>
    );
}

export default Sidebar;
