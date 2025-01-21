import { ProductTypeFormData, ProjectFormData } from '@/types';

export const addProject = async (projectData: ProjectFormData) => {
  try {
    const formattedData = {
      id: 0,
      ...projectData,
      st_Budget: projectData.st_Budget.toString(),
      st_Date: projectData.startDate.toISOString(),
    };

    const response = await fetch('https://localhost:7139/api/projects/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Response Error:', errorData);
      throw new Error(errorData.message || 'Failed to add project');
    }

    const data = await response.json();
    console.log('Project successfully added:', data);
    return data;
  } catch (error) {
    console.error('Error adding project:', error);
    throw error;
  }
};

export const GetAllGovernorate = async () => {
  try {
    const response = await fetch('https://localhost:7139/api/governments', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Response Error:', errorData);
      throw new Error(errorData.message || 'Failed to fetch governorate');
    }

    const data = await response.json();
    // console.log('Governorate fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error fetching governorate:', error);
    throw error;
  }
};

export const addProductType = async (productData: ProductTypeFormData) => {
  try {
    const formattedData = {
      ...productData,
      
    };
    const response = await fetch('https://localhost:7287/api/Products/addProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Response Error:', errorData);
      throw new Error(errorData.message || 'Failed to add product');
    }

    const data = await response.json();
    console.log('product successfully added:', data);
    return data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const GetAllTypes = async () => {
  try {
    const response = await fetch('https://localhost:7287/api/ProductType/getTypes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Response Error:', errorData);
      throw new Error(errorData.message || 'Failed to fetch types');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching types:', error);
    throw error;
  }
};