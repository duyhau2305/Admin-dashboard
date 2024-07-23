import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/shared/Layout';
import Dashboard from './components/Dashboard';
import ProductPage from './components/ProductPage';
import QCTool from './components/pages/QC Tool/QCTool';
import HelpAndSupport from './components/pages/Support/HelpAndSupport';
import Message from './components/pages/Message';
import QCReport from './components/pages/QCReport';
import Standard from './components/pages/Standard';
import Settings from './components/pages/Settings';
import Profile from './components/pages/Profile';
import Login from './components/shared/Login';
import Product2 from './components/Product2';

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
            <Route path="*" element={<Outlet />} /> {/* Render các route con ở đây */}
          </Route>
          <Route path="qctool" element={<QCTool />} />
          <Route path="qcreport" element={<QCReport />} />
          <Route path="standard" element={<Standard />} />
          <Route path="messages" element={<Message />} />
          <Route path="settings" element={<Settings />} />
          <Route path="support" element={<HelpAndSupport />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
