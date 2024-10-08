import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';

import PrivateRoute from './contexts/PrivateRoute';
import ProtectedRoute from './contexts/ProtectedRoute'
import Layout from './components/shared/Layout';
import Dashboard from './components/Dashboard';
import ProductPage from './components/ProductPage';
import Product2 from './components/Product2';
import Product3 from './components/Product3';
import HelpAndSupport from './components/pages/Support/HelpAndSupport';
import Settings from './components/pages/Settings';
import Profile from './components/pages/Profile';
import Login from './components/shared/Login';
import Timsheets from './components/pages/Timsheets';
import UserList from './components/pages/Admin/Userlist';
import MaterialsCatalog from './components/MaterialsCatalog';
import SubstituteMaterialTable from './components/pages/QA/SubstituteMaterialTable';
import RegistrationTable from './components/pages/QA/RegistrationTable';
import InspectionSheet from './components/pages/QA/InspectionSheet';
import WorkRegistration from './components/WorkRegistration';
import OvertimeRegistration from './components/pages/works/Timextra';
import News from './components/pages/News';
import HelpAndSupportManagement from './components/pages/Support/HelpAndSupportManagement';
import PhuLieuCatalog from './components/pages/QC Tool/PhuLieuPage';
import SamplingComponent from './components/pages/QC Tool/SamplingPhuLieuComponent';
import MaterialSamplingComponent from './components/pages/QC Tool/MaterialSamplingComponent';
import ResultPhuLieu from './components/pages/QC Tool/ResultPhuLieu';
import ResultNguyenLieu from './components/pages/QC Tool/ResultNguyenLieu';
import ChemicalTable from './components/pages/QC Tool/HC/ChemicalTable';
import ChemicalEntry from './components/pages/QC Tool/HC/ChemicalEntry';
import ExportChemical from './components/pages/QC Tool/HC/ExportChemical';
import ProductList from './components/pages/QC Tool/TP/ProductList';
import ProductSampling from './components/pages/QC Tool/TP/ProductSampling';
import ManageNews from './components/pages/Admin/ManageNews';
import NewsDetail from './components/NewsDetail';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />

              {/* Products Routes */}
              <Route path="products" element={<ProductPage />}>
                <Route index element={<ProductPage />} />
                <Route path="product2" element={<Product2 />} />
                <Route path="product3" element={<Product3 />} />
              </Route>

              {/* QA Routes */}
              <Route path="qa" element={<MaterialsCatalog />}>
                <Route index element={<MaterialsCatalog />} />
                <Route path="danhmucnguyenlieu" element={<MaterialsCatalog />} />
                <Route path="nguyenlieuthaythe" element={<SubstituteMaterialTable />} />
                <Route path="sodangky" element={<RegistrationTable />} />
                <Route path="phieukiemnghiemnguyenlieu" element={<InspectionSheet />} />
              </Route>
              
              {/* QC Routes */}
              <Route path="qc" element={<MaterialsCatalog />}>
                <Route index element={<MaterialsCatalog />} />
                <Route path="qlpl" element={<PhuLieuCatalog />}>
                  <Route path="dmpl" element={<PhuLieuCatalog />} />
                  <Route path="maupl" element={<SamplingComponent />} />
                  <Route path="phieukiemnghiem" element={<ResultPhuLieu />} />
                </Route>
                <Route path="qlnl" element={<MaterialsCatalog />}>
                  <Route path="dmnl" element={<MaterialsCatalog />} />
                  <Route path="maunl" element={<MaterialSamplingComponent />} />
                  <Route path="phieukiemnghiem" element={<ResultNguyenLieu />} />
                </Route>
                <Route path="qlhc" element={<ChemicalTable />}>
                  <Route path="dmhc" element={<ChemicalTable />} />
                  <Route path="nhaphc" element={<ChemicalEntry />} />
                  <Route path="xuathc" element={<ExportChemical />} />
                </Route>
                <Route path="qltp" element={<ProductList />}>
                  <Route path="dmtp" element={<ProductList />} />
                  <Route path="mautp" element={<ProductSampling />} />
                </Route>
              </Route>

              {/* Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="admin" element={<UserList />}>
                  <Route index element={<UserList />} />
                  <Route path="userlist" element={<UserList />} />
                  <Route path="managenews" element={<ManageNews />} />
                  <Route path="managehelpandsupport" element={<HelpAndSupportManagement />} />
                </Route>
              </Route>

              {/* Timesheets Routes */}
              <Route path="timesheets" element={<Timsheets />}>
                <Route index element={<Timsheets />} />
                <Route path="timesheet" element={<Timsheets />} />
                <Route path="dangkylamviec" element={<WorkRegistration />} />
                <Route path="dangkythemgio" element={<OvertimeRegistration />} />
              </Route>

              {/* Other Routes */}
              <Route path="news" element={<News />} />
              <Route path="/news/:id" component={<NewsDetail />} />
              <Route path="settings" element={<Settings />} />
              <Route path="support" element={<HelpAndSupport />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
