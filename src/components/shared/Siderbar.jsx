import React from 'react'
import {FcBiotech} from "react-icons/fc";
import { Navigate ,useNavigate} from 'react-router-dom';

import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../../libs/consts/navigation';
import { HiOutlineLogout } from 'react-icons/hi';
const linkClasses = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'



function Siderbar() {
    const nagvigate =useNavigate();
  return (
    <div className="flex bg-neutral-800 flex-col w-64 p-2 text-white">
        <div className="flex gap-2 items-center px-2 py-3">
            <FcBiotech fontSize={20}/>
            <span className="text-neutral-100 text-[16px] ">Phamracy Management</span>
        </div>
        <div className="flex flex-1 py-10 px-2 flex-col gap-2" >
            {DASHBOARD_SIDEBAR_LINKS.map((item)=>(
                <SiderbarLink key={item.key} item={item}/>
            ))}
           
        </div>
        <div className="w-full px-2" >
            {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item)=>(
                <SiderbarLink key={item.key} item={item}/>
            ))}
            <div className={classNames('text-red-500 cursor-pointer', linkClasses)} onClick={()=>nagvigate('/login')}>
                <span className="text-xl">
                    <HiOutlineLogout />
                </span>
                Log Out

            </div>
           
        </div>

        
    </div>
  )
}
function SiderbarLink({item}) {
    const {pathname}=useLocation();
    return (
        <Link to={item.path} className={classNames(pathname===item.path?'bg-neutral-400 text-white':'text-white',linkClasses)} >
         <span className="text-xl">{item.icon}</span>
         {item.label}
        </Link>
    )
}

export default Siderbar