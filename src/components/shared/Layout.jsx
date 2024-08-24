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
import UserList from '../pages/Admin/Userlist';
import MaterialsCatalog from '../MaterialsCatalog';
import Product3 from '../Product3';
import SubstituteMaterialTable from '../pages/QA/SubstituteMaterialTable';
import RegistrationTable from '../pages/QA/RegistrationTable';
import InspectionSheet from '../pages/QA/InspectionSheet';
import WorkRegistration from '../WorkRegistration';
import OvertimeRegistration from '../pages/works/Timextra';
import ManageNews from '../pages/Admin/ManageNews';
import HelpAndSupportManagement from '../pages/Support/HelpAndSupportManagement';

// import QCTool from '../pages/QC Tool/QCTool';
import PhuLieuPage from '../pages/QC Tool/PhuLieuPage';
import SamplingComponent from '../pages/QC Tool/SamplingComponent';
import MaterialSamplingComponent from '../pages/QC Tool/MaterialSamplingComponent';
import ResultPhuLieu from '../pages/QC Tool/ResultPhuLieu';
import ResultNguyenLieu from '../pages/QC Tool/ResultNguyenLieu';
import ChemicalTable from '../pages/QC Tool/HC/ChemicalTable';
import ChemicalEntry from '../pages/QC Tool/HC/ChemicalEntry';
import ExportChemical from '../pages/QC Tool/HC/ExportChemical';
import ProductList from '../pages/QC Tool/TP/ProductList';
import ProductSampling from '../pages/QC Tool/TP/ProductSampling';



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
  '/qc/qlnl/phieukiemnghiem': ResultNguyenLieu, 
  '/qc/qlhc': ChemicalTable,
  '/qc/qlhc/dmhc': ChemicalTable,
  '/qc/qlhc/nhaphc': ChemicalEntry,
  '/qc/qlhc/xuathc': ExportChemical,

  '/qc/qltp': ProductList,
  '/qc/qltp/dmtp': ProductList,
  '/qc/qltp/mautp': ProductSampling,

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
      {/* Siderbar luôn cố định */}
      <div className="flex-none">
        <Siderbar />
      </div>
      <div className="flex-1 flex flex-col">
        {/* Header luôn cố định và chiếm toàn bộ chiều rộng */}
        <div className="flex-none w-full flex-shrink-0">
          <Header searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
        </div>
        {/* Nội dung chính có thể cuộn theo cả chiều ngang và dọc */}
        <div className="p-2 bg-neutral-200 flex-1 overflow-auto">
          <div className="min-w-[1000px] overflow-x-auto"> {/* Đảm bảo có chiều rộng tối thiểu và cuộn ngang */}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;