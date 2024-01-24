import React from 'react'
import {IoSad ,IoBarcode,IoDocument,IoFolder} from 'react-icons/io5'



function DashboardStatsGrid() {
  return (
    <div className="flex gap-2">
        <BoxWrapper>
            <div className="bg-sky-500 rounded-full h-10 w-10 flex items-center justify-center">
                <IoBarcode className="text-2xl text-white"/>
            </div>
            <div className="pl-4">
                <span className="text-sm text-gray-500 font-light">Total Products</span>
                <div className="flex items-center">
                    <strong className=" text-lg text-gray-700 font-semibold">2345</strong>
                    <span className="text-sm text-green-500 pl-2">+234</span>
                </div>
            </div>
        </BoxWrapper>
        <BoxWrapper>
        <div className="bg-sky-500 rounded-full h-10 w-10 flex items-center justify-center">
                <IoDocument className="text-2xl text-white"/>
            </div>
            <div className="pl-4">
                <span className="text-sm text-gray-500 font-light">Total Sampled</span>
                <div className="flex items-center">
                    <strong className=" text-lg text-gray-700 font-semibold"> 2345</strong>
                    <span className="text-sm text-green-500 pl-2">+234</span>
                </div>
            </div>
        </BoxWrapper>
        <BoxWrapper>
        <div className="bg-sky-500 rounded-full h-10 w-10 flex items-center justify-center">
                <IoFolder className="text-2xl text-white"/>
            </div>
            <div className="pl-4">
                <span className="text-sm text-gray-500 font-light">Total QC</span>
                <div className="flex items-center">
                    <strong className=" text-lg text-gray-700 font-semibold"> 2345</strong>
                    <span className="text-sm text-green-500 pl-2">+234</span>
                </div>
            </div>
        </BoxWrapper>
        <BoxWrapper>
        <div className="bg-sky-500 rounded-full h-10 w-10 flex items-center justify-center">
                <IoSad className="text-2xl text-white"/>
            </div>
            <div className="pl-4">
                <span className="text-sm text-gray-500 font-light">Total Failed</span>
                <div className="flex items-center">
                    <strong className=" text-lg text-gray-700 font-semibold"> 2345</strong>
                    <span className="text-sm text-red-500 pl-2">+234</span>
                </div>
            </div>
        </BoxWrapper>
    </div>
  )
}

export default DashboardStatsGrid
function BoxWrapper({children}) {
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
    
}