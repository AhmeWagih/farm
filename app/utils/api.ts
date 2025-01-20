import axios from 'axios';
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
    const formattedData = { ...productData };
    console.log('Product Data Sent:', formattedData);

    const response = await axios.post(
      'https://127.0.0.1:7287/api/Products/addProduct',
      formattedData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Product successfully added:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Response Error:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to add product');
    }
    console.error('Unexpected Error:', error);
    throw error;
  }
};
