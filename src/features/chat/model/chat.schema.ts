import { normalizePhone } from '@/shared/lib/phone';
import { z } from 'zod';

export const createChatSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(1, 'Введите номер телефона')
    .transform(normalizePhone)
    .refine(
      (value) => /^7\d{10}$/.test(value) || /^375\d{9}$/.test(value),
      'Введите корректный номер РФ или Беларуси',
    ),
});

export type CreateChatFormValues = z.infer<typeof createChatSchema>;
