'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { formSchema } from '@/app/utils/schema';
import { addProject } from '@/app/utils/api';
import Image from 'next/image';

const ProductPriceForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project: 'aa', // Add this
      projectNameAr: '',
      pro_Type: 1,
      pro_Place: 1,
      startDate: new Date(),
      customer_ID: 1,
      st_Budget: '',
      gov_COD: 0,
      pro_Address: '',
      pro_LocationDetail: '',
      pro_Mail: 'ahmed@gmail.com',
      productImage: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await addProject(values);
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
          تسجيل اسعار المنتجات
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                {/* Arabic Project Name */}
                <FormField
                  control={form.control}
                  name="projectNameAr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم المنتج </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل اسم المشروع"
                          className="text-right"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Data */}
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تاريخ التسجيل</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="w-full justify-between text-right"
                            >
                              {field.value
                                ? field.value.toLocaleDateString('ar-EG')
                                : 'اختر التاريخ'}
                              <CalendarIcon className="ml-2 h-4 w-4" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Number of Registration */}
                <FormField
                  control={form.control}
                  name="st_Budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم التسجيل</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="أدخل رقم التسجيل"
                          className="text-right"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Place of Production */}
                <FormField
                  control={form.control}
                  name="st_Budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>جهة الانتاج</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="أدخل  جهة الانتاج"
                          className="text-right"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Product Supplier */}
                <FormField
                  control={form.control}
                  name="pro_Address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> المورد </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل  مورد المنتج"
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
                {/* Place of Sails */}
                <FormField
                  control={form.control}
                  name="pro_Address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> جهة البيع </FormLabel>
                      <FormControl>
                        <Input
                          placeholder=" أدخل  جهة البيع "
                          className="text-right"
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
                  name="productImage"
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
                                <Image
                                  id="imagePreview"
                                  src=""
                                  width={500}
                                  height={500}
                                  className="w-full h-72 object-contain"
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

export default ProductPriceForm;
