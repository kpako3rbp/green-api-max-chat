import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { createChatSchema, type CreateChatFormValues } from '../model/chat.schema';

import styles from './CreateChatForm.module.css';

type CreateChatFormProps = {
  onSubmit: (phone: string) => Promise<void>;
  isLoading: boolean;
  error?: string | null;
};

export const CreateChatForm = ({ onSubmit, isLoading, error }: CreateChatFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateChatFormValues>({
    resolver: zodResolver(createChatSchema),
    defaultValues: {
      phone: '',
    },
  });

  const handleFormSubmit = (values: CreateChatFormValues) => {
    return onSubmit(values.phone);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <Input
        {...register('phone')}
        label="Номер телефона"
        placeholder="+7 (999) 123-45-67"
        error={errors.phone?.message}
      />

      {error && <div className={styles.error}>{error}</div>}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Проверяем...' : 'Создать чат'}
      </Button>
    </form>
  );
};
