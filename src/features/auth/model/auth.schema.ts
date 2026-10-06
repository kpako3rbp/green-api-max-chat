import { z } from 'zod';

export const authSchema = z.object({
  apiUrl: z.string().trim().url('Введите корректный apiUrl'),

  idInstance: z.string().trim().min(1, 'Введите idInstance'),

  apiTokenInstance: z.string().trim().min(1, 'Введите apiTokenInstance'),
});

export type AuthFormValues = z.infer<typeof authSchema>;
