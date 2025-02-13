import { z } from 'zod';

export const productTypesSchema = z.object({
  id: z.number(),
  product_Name_Ar: z.string(),
  product_Name_En: z.string(),
  type: z.string(),
  register_Number: z.number(),
  reg_Site_Name: z.string(),
  scientific_Class: z.string(),
  producer_Name: z.string(),
  specification_Info: z.string(),
  ImageFile: z.union([z.instanceof(File), z.string(), z.null()])
});

export const formSchema = z.object({
  project: z.string(),
  projectNameAr: z.string(),
  projectNameEn: z.string(),
  pro_Type: z.number(),
  pro_Place: z.number(),
  startDate: z.date(),
  customer_ID: z.number(),
  st_Budget: z.string(),
  gov_COD: z.number(),
  pro_Address: z.string(),
  pro_LocationDetail: z.string(),
  pro_Mail: z.string().email(),
  productImage: z.any(),
  requirements: z.string().optional(),
  manager: z.string().optional()
});