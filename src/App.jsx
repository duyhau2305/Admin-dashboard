import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/shared/Layout';
import Dashboard from './components/Dashboard';
import ProductPage from './components/ProductPage';

import HelpAndSupport from './components/pages/Support/HelpAndSupport';
import Settings from './components/pages/Settings';
import Profile from './components/pages/Profile';
import Login from './components/shared/Login';
import Product2 from './components/Product2';
import Timsheets from './components/pages/Timsheets';
import UserList from './components/Userlist';
import MaterialsCatalog from './components/MaterialsCatalog';
import Product3 from './components/Product3';
import SubstituteMaterialTable from './components/SubstituteMaterialTable';
import RegistrationTable from './components/RegistrationTable';
import InspectionSheet from './components/InspectionSheet';
import WorkRegistration from './components/WorkRegistration';
import OvertimeRegistration from './components/pages/works/Timextra';
import News from './components/pages/News';
import HelpAndSupportManagement from './components/pages/Support/HelpAndSupportManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductPage />}>
            <Route index element={<ProductPage />} />
            <Route path="product2" element={<Product2 />} />
            <Route path="product3" element={<Product3 />} />
            <Route path="*" element={<Outlet />} /> {/* Render các route con ở đây */}
          </Route>
          <Route path="qa" element={<MaterialsCatalog />}>
            <Route index element={<MaterialsCatalog />} />
            <Route path="qa/danhmucnguyenlieu" element={<MaterialsCatalog />} />
            <Route path="qa/nguyenlieuthaythe'" element={<SubstituteMaterialTable />} />
            <Route path="qa/sodangky'" element={<RegistrationTable />} />
            <Route path="qa/phieukiemnghiemnguyenlieu'" element={<InspectionSheet />} />
            <Route path="*" element={<Outlet />} /> {/* Render các route con ở đây */}
          </Route>
          
         
          <Route path="qc" element={<MaterialsCatalog />}>
            <Route index element={<MaterialsCatalog />} />
            <Route path="qlpl" element={<UserList />} />
            <Route path="*" element={<Outlet />} /> {/* Render các route con ở đây */}
          </Route>
          <Route path="admin" element={<UserList />}>
            <Route index element={<ProductPage />} />
            <Route path="userlist" element={<UserList />} />
            <Route path="managenews" element={<UserList />} />
            <Route path="managehelpandsupport" element={<HelpAndSupportManagement />} />
            <Route path="*" element={<Outlet />} /> {/* Render các route con ở đây */}
          </Route>
          <Route path="timesheets" element={<Timsheets />}>
            <Route index element={<Timsheets />} />
            <Route path="timesheet" element={<Timsheets />} />
            <Route path="dangkylamviec" element={<WorkRegistration/>} />
            <Route path="dangkythemgio" element={<OvertimeRegistration/>} />
            <Route path="*" element={<Outlet />} /> {/* Render các route con ở đây */}
          </Route>
          
          <Route path="messages" element={<News/>} />
          <Route path="settings" element={<Settings />} />
          <Route path="support" element={<HelpAndSupport />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
