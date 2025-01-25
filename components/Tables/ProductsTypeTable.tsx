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
import { getAllProducts, searchProductsByName, deleteProduct } from '@/app/utils/api';
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from '@/types';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

const ProductsTypeTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data || []);
      } catch (err) {
        console.log(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    setLoading(true);
    
    try {
      if (value.trim()) {
        const searchResults = await searchProductsByName(value);
        setProducts(searchResults || []);
      } else {
        const allProducts = await getAllProducts();
        setProducts(allProducts || []);
      }
    } catch (err) {
      console.log(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };

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
    <div className="space-y-4">
      <div className="flex justify-start">
        <Input
          type="text"
          placeholder="ابحث عن المنتج..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-sm focus:outline-none"
          dir="rtl"
        />
      </div>
      
      <div className="rounded-md border overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-white">
            <TableRow>
              {/* <TableHead className="w-30 text-right">الرقم التعريفي</TableHead> */}
              <TableHead className="min-w-40 text-right">اسم المنتج (بالعربية)</TableHead>
              <TableHead className="min-w-40 text-right">اسم المنتج (بالانجليزية)</TableHead>
              <TableHead className="min-w-40 text-right">نوع المنتج</TableHead>
              <TableHead className="min-w-40 text-right">رقم التسجيل</TableHead>
              <TableHead className="min-w-40 text-right">اسم الجهه التسجيل</TableHead>
              <TableHead className="min-w-40 text-right">التصنيف العلمي</TableHead>
              <TableHead className="min-w-40 text-right">جهات الإنتاج</TableHead>
              <TableHead className="min-w-40 text-right">المواصفات العلمية</TableHead>
              <TableHead className="min-w-40 text-right">الصورة</TableHead>
              <TableHead className="min-w-40 text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-10">
                  <div className="text-gray-500">لا توجد بيانات متاحة</div>
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-50">
                  {/* <TableCell className="text-right">{product.id}</TableCell> */}
                  <TableCell className="text-right">{product.product_Name_Ar}</TableCell>
                  <TableCell className="text-right">{product.product_Name_En}</TableCell>
                  <TableCell className="text-right">{product.productTypeName}</TableCell>
                  <TableCell className="text-right">{product.register_Number}</TableCell>
                  <TableCell className="text-right">{product.reg_Site_Name}</TableCell>
                  <TableCell className="text-right">{product.scientific_Class}</TableCell>
                  <TableCell className="text-right">{product.producer_Name}</TableCell>
                  <TableCell className="text-right">{product.specification_Info}</TableCell>
                  <TableCell className="text-right">
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
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(product.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-blue-500 hover:text-blue-700"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductsTypeTable;