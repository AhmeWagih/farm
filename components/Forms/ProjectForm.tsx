'use client';

import { useEffect, useState } from 'react';
import { Governorate } from '@/types';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { addProject, GetAllGovernorate } from '@/app/utils/api';
import { formSchema } from '@/app/utils/schema';

const ProjectForm = () => {
  const [governorate, setGovernorate] = useState<Governorate[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project: 'aa', // Add this
      projectNameAr: '',
      projectNameEn: '',
      pro_Type: 1,
      pro_Place: 1,
      startDate: new Date(),
      customer_ID: 1,
      st_Budget: '',
      gov_COD: 0,
      pro_Address: '',
      pro_LocationDetail: '',
      pro_Mail: 'ahmed@gmail.com',
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

  useEffect(() => {
    const fetchGovernorate = async () => {
      try {
        const data = await GetAllGovernorate();
        setGovernorate(data);
      } catch (error) {
        console.error('Error fetching governorate:', error);
      }
    };
    fetchGovernorate();
  }, []);

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">إدارة المشروع</CardTitle>
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
                      <FormLabel>اسم المشروع ( باللغة العربية ) </FormLabel>
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
                {/* English Project Name */}
                <FormField
                  control={form.control}
                  name="projectNameEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم المشروع ( باللغة الانجليزية ) </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ُEnter Project Name"
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
                      <FormLabel>تاريخ بدء المشروع</FormLabel>
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
                {/* Budget */}
                <FormField
                  control={form.control}
                  name="st_Budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ميزانية المشروع</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="أدخل الميزانية"
                          className="text-right"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                {/* Governorate */}
                <FormField
                  control={form.control}
                  name="gov_COD"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المحافظة</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const selectedGov = governorate.find(
                            (gov) => gov.id.toString() === value
                          );
                          if (selectedGov) {
                            field.onChange(selectedGov.type);
                          }
                        }}
                        value={field.value?.toString() || undefined}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر المحافظة" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {governorate.length === 0 ? (
                            <SelectItem value="loading" disabled>
                              جاري التحميل...
                            </SelectItem>
                          ) : (
                            governorate.map((gov) => (
                              <SelectItem
                                className="text-right"
                                key={gov.id}
                                value={gov.id.toString()}
                              >
                                {gov.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Project Address */}
                <FormField
                  control={form.control}
                  name="pro_Address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>عنوان المشروع </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل عنوان المشروع"
                          className="text-right"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Project Location Detail */}
                <FormField
                  control={form.control}
                  name="pro_LocationDetail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>شرح منطقة المشروع</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="أدخل تفاصيل المنطقة"
                          className="h-24 text-right"
                          {...field}
                        />
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

export default ProjectForm;
