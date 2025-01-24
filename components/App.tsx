'use client';

import { useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import ProjectForm from './Forms/ProjectForm';
import LeftSidebar from './shared/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import ProductPriceForm from './Forms/ProductPriceForm';
import ProductTypesForm from './Forms/ProductTypesForm';
import ProductsTypeTable from './Tables/ProductsTypeTable';

{
  /* Render the forms */
}
const ProductPrice = () => <ProductPriceForm />;
const ProductTypes = () => <ProductTypesForm />;
const Project = () => <ProjectForm />;
{
  /* Render the tables */
}
const ProductsTable = () => <ProductsTypeTable />;
const ProductPriceTable = () => <div>Product Price Table</div>;
const ProjectsTable = () => <div>Projects Table</div>;

const App = () => {
  {
    /* Render the forms */
  }
  const [activeItem, setActiveItem] = useState('product-type');
  const renderForm = () => {
    switch (activeItem) {
      case 'product-type':
        return <ProductTypes />;
      case 'product-price':
        return <ProductPrice />;
      case 'projects':
        return <Project />;
      default:
        return null;
    }
  };

  const renderTable = () => {
    switch (activeItem) {
      case 'product-type':
        return <ProductsTable />;
      case 'product-price':
        return <ProductPriceTable />;
      case 'projects':
        return <ProjectsTable />;
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full px-10 bg-slate-100" dir="rtl">
        <Navbar activeItem={activeItem} setActiveItem={setActiveItem} />
        <div className="flex flex-1 mx-3 ">
          {/* Main Content */}
          <main className="flex-1 w-full py-4 md:p-6 !pt-0 ">
            <div className="w-full bg-white rounded-lg shadow-md p-6 min-h-[calc(100vh-100px)]">
              {renderForm()}
            </div>
          </main>
          {/* Sidebar */}
          <LeftSidebar className="bg-white mx-auto w-64 rounded-lg shadow-md p-6 max-h-[calc(100vh-100px)]" />
        </div>
        <div className="px-10 mb-10">{renderTable()}</div>
      </div>
    </SidebarProvider>
  );
};

export default App;
