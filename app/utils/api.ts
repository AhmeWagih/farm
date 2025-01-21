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

    const response = await axios.post(
      'https://localhost:7139/api/projects/add',
      formattedData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Project successfully added:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding project:', error);
    if (axios.isAxiosError(error)) {
      console.error('API Response Error:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to add project');
    }
    throw error;
  }
};

export const GetAllGovernorate = async () => {
  try {
    const response = await axios.get('https://localhost:7139/api/governments', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // console.log('Governorate fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching governorate:', error);
    if (axios.isAxiosError(error)) {
      console.error('API Response Error:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to fetch governorate');
    }
    throw error;
  }
};

export const addProductType = async (productData: ProductTypeFormData) => {
  try {
    const formattedData = {
      ...productData,
    };

    const response = await axios.post(
      'https://localhost:7287/api/Products/addProduct',
      formattedData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('product successfully added:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    if (axios.isAxiosError(error)) {
      console.error('API Response Error:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to add product');
    }
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