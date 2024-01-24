import React from 'react'
import DashboardStatsGrid from './DashboardStatsGrid'

import Transactionchart from './Transactionchart'
import BuyerProfilePieChart from './BuyerProfilePieChart'
import RecentOrders from './RecentOrders'
import PopularProducts from './PopularProducts'


function Dashboard() {
  return (
    <div className="flex flex-col gap-2"> 
        <div className="flex flex-col gap-2 w-[100%]"> 
         <DashboardStatsGrid /> 
         {/* <News /> */}
         </div>
              
        <div className="flex flex-row gap-4 w-full">
          <Transactionchart />
          <BuyerProfilePieChart />
          
          
        </div>
        <div className="flex flex-row gap-2 w-full">
          <RecentOrders />
          <PopularProducts />        

        </div>
    </div>
  )
}

export default Dashboard