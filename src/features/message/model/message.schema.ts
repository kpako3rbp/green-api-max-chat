import { z } from 'zod';

export const messageSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, 'Введите сообщение'),
});

export type MessageFormValues = z.infer<
  typeof messageSchema
>;