'use client';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { productTypesSchema } from '@/app/utils/schema';
import { addProductType, GetAllTypes } from '@/app/utils/api';
import { Textarea } from '../ui/textarea';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { ProductType } from '@/types';

const ProductTypesForm = () => {
  const [types, setTypes] = useState<ProductType[]>([]);

  const form = useForm<z.infer<typeof productTypesSchema>>({
    resolver: zodResolver(productTypesSchema),
    defaultValues: {
      id: 0,
      product_Name_Ar: '',
      product_Name_En: '',
      type: '', // This will store the ID of the selected type
      register_Number: 0,
      reg_Site_Name: '',
      scientific_Class: '',
      producer_Name: '',
      specification_Info: '',
      ImageFile: null, // Initialize as null for file upload
    },
  });

  // Fetch product types on component mount
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const data = await GetAllTypes();
        setTypes(data);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };
    fetchTypes();
  }, []);

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof productTypesSchema>) => {
    try {
      console.log('Form values before processing:', values);

      // Validate required fields
      if (
        !values.product_Name_Ar ||
        !values.product_Name_En ||
        !values.ImageFile
      ) {
        alert('Please fill in all required fields');
        return;
      }

      // Prepare FormData for API submission
      const formData = new FormData();
      formData.append('product_Name_Ar', values.product_Name_Ar);
      formData.append('product_Name_En', values.product_Name_En);
      formData.append('type', values.type); // Send the ID of the selected type
      formData.append('register_Number', values.register_Number.toString());
      formData.append('reg_Site_Name', values.reg_Site_Name);
      formData.append('scientific_Class', values.scientific_Class);
      formData.append('producer_Name', values.producer_Name);
      formData.append('specification_Info', values.specification_Info);

      // Validate and append image file
      if (values.ImageFile instanceof File) {
        formData.append('ImageFile', values.ImageFile);
      } else {
        console.error('Invalid file format for ImageFile');
        alert('Please upload a valid image file');
        return;
      }

      console.log('Sending to API:', formData);

      // Submit form data
      const response = await addProductType(formData);
      console.log('API Response:', response);
      alert('تمت إضافة المنتج بنجاح!');
      form.reset(); // Reset the form after successful submission
    } catch (error) {
      console.error('Detailed Error:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios Response Error:', error.response?.data);
      }
      alert(
        'حدث خطأ. يرجى المحاولة مرة أخرى. ' +
          (error instanceof Error ? error.message : '')
      );
    }
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          تسجيل أنواع المنتجات
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Arabic Product Name */}
                <FormField
                  control={form.control}
                  name="product_Name_Ar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم المنتج باللغة العربية</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل اسم المنتج"
                          className="text-right"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Product Type Dropdown */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نوع المنتج</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value); // Store the ID of the selected type
                        }}
                        value={field.value || ''} // Use the ID as the value
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر نوع المنتج">
                              {types.find((ty) => ty.id.toString() === field.value)?.typeName ||
                                'اختر نوع المنتج'}
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {types.length === 0 ? (
                            <SelectItem value="loading" disabled>
                              جاري التحميل...
                            </SelectItem>
                          ) : (
                            types.map((ty) => (
                              <SelectItem
                                className="text-right"
                                key={ty.id}
                                value={ty.id.toString()} // Use the ID as the value
                              >
                                {ty.typeName}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Registration Number */}
                <FormField
                  control={form.control}
                  name="register_Number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم التسجيل العلمي</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="أدخل رقم التسجيل العلمي"
                          className="text-right"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Registration Site */}
                <FormField
                  control={form.control}
                  name="reg_Site_Name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>جهة التسجيل</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل جهة التسجيل"
                          className="text-right"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Scientific Classification */}
                <FormField
                  control={form.control}
                  name="scientific_Class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>التصنيف العلمي</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل التصنيف العلمي"
                          className="text-right"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Producer Name */}
                <FormField
                  control={form.control}
                  name="producer_Name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>جهات الإنتاج</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل جهات الإنتاج"
                          className="text-right"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* English Product Name */}
                <FormField
                  control={form.control}
                  name="product_Name_En"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم المنتج باللغة الإنجليزية</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Product Name"
                          className="text-right"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Specification Info */}
                <FormField
                  control={form.control}
                  name="specification_Info"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المواصفات العلمية</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="أدخل المواصفات العلمية"
                          className="h-24 text-right"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Product Image Upload */}
                <FormField
                  control={form.control}
                  name="ImageFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>صورة المنتج</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          {!field.value ? (
                            <Input
                              type="file"
                              accept="image/*"
                              className="text-right h-24 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold hover:file:bg-gray-100"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  field.onChange(file); // Update the form state with the file
                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                    const preview = document.getElementById(
                                      'imagePreview'
                                    ) as HTMLImageElement;
                                    if (preview && e.target) {
                                      preview.src = e.target.result as string;
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          ) : (
                            <div className="relative">
                              <div className="rounded-lg shadow-lg overflow-hidden">
                                <img
                                  id="imagePreview"
                                  src={
                                    typeof field.value === 'object'
                                      ? URL.createObjectURL(field.value)
                                      : field.value
                                  }
                                  className="w-full h-56 object-contain"
                                  alt="Preview"
                                />
                                <button
                                  type="button"
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 w-8 h-7 flex items-center justify-center hover:bg-red-600"
                                  onClick={() => {
                                    field.onChange(null); // Clear the file from the form state
                                    const preview = document.getElementById(
                                      'imagePreview'
                                    ) as HTMLImageElement;
                                    if (preview) {
                                      preview.src = '';
                                    }
                                  }}
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-32"
                onClick={() => form.reset()}
              >
                حذف
              </Button>
              <Button type="submit" className="w-32">
                تسجيل
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductTypesForm;