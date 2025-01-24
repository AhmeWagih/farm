export interface INavbarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

export interface ProjectFormData {
  projectNameAr: string; // Project name in Arabic
  projectNameEn: string; // Project name in English
  pro_Type: number; // Project type ID
  pro_Place: number; // Project place ID
  startDate: Date; // Start date of the project
  customer_ID: number; // Customer ID
  st_Budget: string; // Budget of the project
  gov_COD: number; // Governorate code
  pro_Address: string; // Project address
  pro_LocationDetail: string; // Additional location details
  pro_Mail: string; // Project email
  productImage?: File | null; // Changed from any to File | null
  requirements?: string;
  manager?: string;
}

export interface Governorate {
  id: number;
  name: string;
  type: string;
  name_En: string;
}

export interface ProductType {
  id: number;
  typeName: string;
}

export interface ProductTypeFormData {
  id: number;
  product_Name_Ar: string;
  product_Name_En: string;
  type: string;
  register_Number: number;
  reg_Site_Name: string;
  scientific_Class: string;
  producer_Name: string;
  specification_Info: string;
}

export interface Product {
  id: number;
  product_Name_Ar: string;
  product_Name_En: string;
  register_Number: number;
  reg_Site_Name: string;
  productTypeName: string;
  scientific_Class: string;
  producer_Name: string;
  specification_Info: string;
  image_Path: string;
}
