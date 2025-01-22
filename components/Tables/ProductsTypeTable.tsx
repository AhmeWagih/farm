'use client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllProducts } from '@/app/utils/api';
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component

interface Product {
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

const ProductsTypeTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data || []); // Set empty array if no data
      } catch (err) {
        setProducts([]); // Handle errors by displaying an empty table
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-20">الرقم التعريفي</TableHead>
            <TableHead className="min-w-40">اسم المنتج (بالعربية)</TableHead>
            <TableHead className="min-w-40">اسم المنتج (بالانجليزية)</TableHead>
            <TableHead className="min-w-40">نوع المنتج</TableHead>
            <TableHead className="min-w-40">رقم التسجيل</TableHead>
            <TableHead className="min-w-40">اسم الجهه التسجيل</TableHead>
            <TableHead className="min-w-40">التصنيف العلمي</TableHead>
            <TableHead className="min-w-40">جهات الإنتاج</TableHead>
            <TableHead className="min-w-40">المواصفات العلمية</TableHead>
            <TableHead className="min-w-40">الصورة</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10} className="text-center py-10">
                <div className="text-gray-500">لا توجد بيانات متاحة</div>
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50">
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.product_Name_Ar}</TableCell>
                <TableCell>{product.product_Name_En}</TableCell>
                <TableCell>{product.productTypeName}</TableCell>
                <TableCell>{product.register_Number}</TableCell>
                <TableCell>{product.reg_Site_Name}</TableCell>
                <TableCell>{product.scientific_Class}</TableCell>
                <TableCell>{product.producer_Name}</TableCell>
                <TableCell>{product.specification_Info}</TableCell>
                <TableCell>
                  {product.image_Path ? (
                    <img
                      src={product.image_Path}
                      alt={product.product_Name_Ar}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/path/to/fallback/image.png';
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTypeTable;
