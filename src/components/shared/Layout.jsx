import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Siderbar from './Siderbar';
import Header from './Header';
import ProductPage from '../ProductPage';
import Dashboard from '../Dashboard';
import QCTool from '../pages/QC Tool/QCTool';
import QCReport from '../pages/QCReport';
import Standard from '../pages/Standard';
import MessagePage from '../pages/Message';
import Settings from '../pages/Settings';
import HelpAndSupport from '../pages/Support/HelpAndSupport';
import Profile from '../pages/Profile';
import Product2 from '../Product2';

function Layout() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const renderContent = () => {
    switch (location.pathname) {
      case '/products':
        return <ProductPage searchQuery={searchQuery} />;
      case '/qatool':
        return <QCTool searchQuery={searchQuery} />;
        case '/products/product2':
          return <Product2 searchQuery={searchQuery} />;  
      case '/qcreport':
        return <QCReport searchQuery={searchQuery} />;
      case '/standard':
        return <Standard searchQuery={searchQuery} />;
      case '/messages':
        return <MessagePage searchQuery={searchQuery} />;
      case '/settings':
        return <Settings searchQuery={searchQuery} />;
      case '/support':
        return <HelpAndSupport searchQuery={searchQuery} />;
      case '/profile':
        return <Profile searchQuery={searchQuery} />;
      default:
        return <Dashboard searchQuery={searchQuery} />;
    }
  };

  return (
    <div className="flex flex-row bg-neutral-400 h-screen w-screen">
      <Siderbar />
      <div className="flex-1 flex flex-col">
        <Header searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
        <div className="p-4 bg-neutral-200 flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Layout;
