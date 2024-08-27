import React, { useState, useMemo, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Siderbar from './Siderbar';
import Header from './Header';
import Dashboard from '../Dashboard';

// Lazy load các component
const ProductPage = React.lazy(() => import('../ProductPage'));
const News= React.lazy(() => import('../pages/News'));
const NewsDetail= React.lazy(() => import('../NewsDetail'));
const Settings = React.lazy(() => import('../pages/Settings'));
const HelpAndSupport = React.lazy(() => import('../pages/Support/HelpAndSupport'));
const Profile = React.lazy(() => import('../pages/Profile'));
const Product2 = React.lazy(() => import('../Product2'));
const Timsheets = React.lazy(() => import('../pages/Timsheets'));
const UserList = React.lazy(() => import('../pages/Admin/Userlist'));
const MaterialsCatalog = React.lazy(() => import('../MaterialsCatalog'));
const Product3 = React.lazy(() => import('../Product3'));
const SubstituteMaterialTable = React.lazy(() => import('../pages/QA/SubstituteMaterialTable'));
const RegistrationTable = React.lazy(() => import('../pages/QA/RegistrationTable'));
const InspectionSheet = React.lazy(() => import('../pages/QA/InspectionSheet'));
const WorkRegistration = React.lazy(() => import('../WorkRegistration'));
const OvertimeRegistration = React.lazy(() => import('../pages/works/Timextra'));
const ManageNews = React.lazy(() => import('../pages/Admin/ManageNews'));
const HelpAndSupportManagement = React.lazy(() => import('../pages/Support/HelpAndSupportManagement'));
const PhuLieuPage = React.lazy(() => import('../pages/QC Tool/PhuLieuPage'));
const SamplingComponent = React.lazy(() => import('../pages/QC Tool/SamplingPhuLieuComponent'));
const MaterialSamplingComponent = React.lazy(() => import('../pages/QC Tool/MaterialSamplingComponent'));
const ResultPhuLieu = React.lazy(() => import('../pages/QC Tool/ResultPhuLieu'));
const ResultNguyenLieu = React.lazy(() => import('../pages/QC Tool/ResultNguyenLieu'));
const ChemicalTable = React.lazy(() => import('../pages/QC Tool/HC/ChemicalTable'));
const ChemicalEntry = React.lazy(() => import('../pages/QC Tool/HC/ChemicalEntry'));
const ExportChemical = React.lazy(() => import('../pages/QC Tool/HC/ExportChemical'));
const ProductList = React.lazy(() => import('../pages/QC Tool/TP/ProductList'));
const ProductSampling = React.lazy(() => import('../pages/QC Tool/TP/ProductSampling'));

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
  '/news': News,
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

  const renderContent = useMemo(() => {
    // Kiểm tra nếu đường dẫn là /news/:id
    if (location.pathname.startsWith('/news/') && location.pathname.split('/').length === 3) {
      return <NewsDetail />;
    }

    // Lấy component tương ứng với pathname hoặc trả về Dashboard nếu không khớp
    const Component = routeComponents[location.pathname] || Dashboard;
    return <Component searchQuery={searchQuery} />;
  }, [location.pathname, searchQuery]);

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
            <Suspense fallback={<div>Loading...</div>}>
              {renderContent}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
