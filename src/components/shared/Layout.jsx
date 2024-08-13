import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Siderbar from './Siderbar';
import Header from './Header';
import ProductPage from '../ProductPage';
import Dashboard from '../Dashboard';
import MessagePage from '../pages/News';
import Settings from '../pages/Settings';
import HelpAndSupport from '../pages/Support/HelpAndSupport';
import Profile from '../pages/Profile';
import Product2 from '../Product2';
import Timsheets from '../pages/Timsheets';
import UserList from '../Userlist';
import MaterialsCatalog from '../MaterialsCatalog';
import Product3 from '../Product3';
import SubstituteMaterialTable from '../SubstituteMaterialTable';
import RegistrationTable from '../RegistrationTable';
import InspectionSheet from '../InspectionSheet';
import WorkRegistration from '../WorkRegistration';
import OvertimeRegistration from '../pages/works/Timextra';
import ManageNews from '../pages/Admin/ManageNews';
import HelpAndSupportManagement from '../pages/Support/HelpAndSupportManagement';

// import QCTool from '../pages/QC Tool/QCTool';
import PhuLieuPage from '../pages/QC Tool/PhuLieuPage';
import SamplingComponent from '../pages/QC Tool/SamplingComponent';
import MaterialSamplingComponent from '../pages/QC Tool/MaterialSamplingComponent';
import ResultPhuLieu from '../pages/QC Tool/ResultPhuLieu';



const routeComponents = {
  '/products': ProductPage,
  '/qa': MaterialsCatalog,
  '/qa/danhmucnguyenlieu': MaterialsCatalog,
  '/qa/nguyenlieuthaythe': SubstituteMaterialTable,
  '/qa/phieukiemnghiemnguyenlieu': InspectionSheet,
  '/qa/sodangky': RegistrationTable,
  '/products/product2': Product2,
  '/products/product3': Product3,
  '/qc': MaterialsCatalog,
  '/qc/qlpl': PhuLieuPage,
  '/qc/qlpl/dmpl': PhuLieuPage,
  '/qc/qlpl/maupl': SamplingComponent,
  '/qc/qlpl/phieukiemnghiem': ResultPhuLieu,
  '/qc/qlnl': MaterialsCatalog,
  '/qc/qlnl/dmnl': MaterialsCatalog,  
  '/qc/qlnl/maunl': MaterialSamplingComponent,  
  '/timesheets': Timsheets,
  '/timesheets/timesheet': Timsheets,
  '/timesheets/dangkylamviec': WorkRegistration,
  '/timesheets/dangkythemgio': OvertimeRegistration,
  '/messages': MessagePage,
  '/admin': UserList,
  '/admin/userlist': UserList,
  '/admin/managenews': ManageNews,
  '/admin/managehelpandsupport': HelpAndSupportManagement,

  '/settings': Settings,
  '/support': HelpAndSupport,
  '/profile': Profile,
};

function Layout() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const renderContent = () => {
    const Component = routeComponents[location.pathname] || Dashboard;
    return <Component searchQuery={searchQuery} />;
  };

  return (
    <div className="flex h-screen w-screen">
      <Siderbar />
      <div className="flex-1 flex flex-col ">
        <Header searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
        <div className="p-2 bg-neutral-200 flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Layout;
