'use client';

import { useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import AgriculturalManufacturingForm from './Forms/AgriculturalManufacturingForm';
import FarmsForm from './Forms/FarmsForm';
import AgriculturalDeveloperForm from './Forms/AgriculturalDeveloperForm';
import IntermediateStationsForm from './Forms/IntermediateStationsForm';
import StorageForm from './Forms/StorageForm';
import ManufacturingForm from './Forms/ManufacturingForm';
import LaboratoriesForm from './Forms/LaboratoriesForm';
import ProjectForm from './Forms/ProjectForm';
import LeftSidebar from './shared/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import ProductPriceForm from './Forms/ProductPriceForm';
import ProductTypesForm from './Forms/ProductTypesForm';

const ProductPrice = () => <ProductPriceForm />;
const ProductTypes = () => <ProductTypesForm />;
const Project = () => <ProjectForm />;
const Farms = () => <FarmsForm />;
const AgriculturalDeveloper = () => <AgriculturalDeveloperForm />;
const IntermediateStations = () => <IntermediateStationsForm />;
const Storage = () => <StorageForm />;
const AgriculturalManufacturing = () => <AgriculturalManufacturingForm />;
const Manufacturing = () => <ManufacturingForm />;
const Laboratories = () => <LaboratoriesForm />;

const App = () => {
  const [activeItem, setActiveItem] = useState('product-type');

  const renderForm = () => {
    switch (activeItem) {
      case 'product-type':
        return <ProductTypes />;
      case 'product-price':
        return <ProductPrice />;
      case 'projects':
        return <Project />;
      case 'farms':
        return <Farms />;
      case 'agricultural-developer':
        return <AgriculturalDeveloper />;
      case 'intermediate-stations':
        return <IntermediateStations />;
      case 'storage':
        return <Storage />;
      case 'agricultural-manufacturing':
        return <AgriculturalManufacturing />;
      case 'manufacturing':
        return <Manufacturing />;
      case 'laboratories':
        return <Laboratories />;
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col w-full" dir="rtl">
        <Navbar activeItem={activeItem} setActiveItem={setActiveItem} />
        <div className="flex flex-1 mx-3 ">
          {/* Main Content */}
          <main className="flex-1 w-full p-4 md:p-6 !pt-0 bg-gray-100">
            <div className="w-full mx-auto bg-white rounded-lg shadow-md p-6 min-h-[calc(100vh-100px)]">
              {renderForm()}
            </div>
          </main>
          {/* Sidebar */}
          <LeftSidebar className="bg-white mx-auto w-64 rounded-lg shadow-md p-6 max-h-[calc(100vh-100px)]" />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default App;
