'use client';

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
import { addProductType } from '@/app/utils/api';
import { Textarea } from '../ui/textarea';

const ProductTypesForm = () => {
  const form = useForm<z.infer<typeof productTypesSchema>>({
    resolver: zodResolver(productTypesSchema),
    defaultValues: {
      id: 0,
      product_Name_Ar: '',
      product_Name_En: '',
      type: 0,
      register_Number: 0,
      productTypeName: '',
      reg_Site_Name: '',
      scientific_Class: '',
      producer_Name: '',
      specification_Info: '',
      image_Path: null,
    },
  });

  async function onSubmit(values: z.infer<typeof productTypesSchema>) {
    try {
      await addProductType(values);
      alert('تمت إضافة المشروع بنجاح!');
      form.reset();
    } catch (error) {
      console.error('Error:', error);
      alert('حدث خطأ. يرجى المحاولة مرة أخرى.');
    }
  }
  

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
              <div className="space-y-4">
                {/* Arabic Product Name */}
                <FormField
                  control={form.control}
                  name="product_Name_Ar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم المنتج باللغة العربية </FormLabel>
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
                {/* Number of Registration */}
                <FormField
                  control={form.control}
                  name="register_Number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم التسجيل العلمي</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
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
                {/* Place of Registration */}
                <FormField
                  control={form.control}
                  name="reg_Site_Name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>جهة التسجيل</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="أدخل  جهة التسجيل"
                          className="text-right"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Scientific Class */}
                <FormField
                  control={form.control}
                  name="scientific_Class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> التصنيف العلمي </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل  التصنيف العلمي"
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
              <div className="space-y-4">
                {/* English Product Name */}
                <FormField
                  control={form.control}
                  name="product_Name_En"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم المنتج باللغة الانجليزية </FormLabel>
                      <FormControl>
                        <Input
                          placeholder=" Enter Product Name"
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
                      <FormLabel> المواصفات العلمية </FormLabel>
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
                  name="image_Path"
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
                                  field.onChange(file);
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
                                  src={URL.createObjectURL(field.value)}
                                  className="w-full h-56 object-contain"
                                  alt="Preview"
                                />
                                <button
                                  type="button"
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 w-8 h-7 flex items-center justify-center hover:bg-red-600"
                                  onClick={() => {
                                    field.onChange(null);
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
