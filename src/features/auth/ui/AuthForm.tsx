import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { authSchema, type AuthFormValues } from '../model/auth.schema';
import { type Credentials } from '../model/auth.types';

import styles from './AuthForm.module.css';
import { useState } from 'react';

const DEFAULT_API_URL = 'https://3100.api.green-api.com';

type AuthFormProps = {
  onSubmit: (credentials: Credentials) => Promise<void>;
};

export const AuthForm = ({ onSubmit }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      idInstance: '',
      apiTokenInstance: '',
      apiUrl: DEFAULT_API_URL,
    },
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFormSubmit = async (values: AuthFormValues) => {
    try {
      setSubmitError(null);

      await onSubmit(values);
    } catch {
      setSubmitError('Не удалось авторизоваться. Проверьте данные инстанса.');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={styles.header}>
        <h1 className={styles.title}>GREEN-API Chat</h1>

        <p className={styles.description}>Введите данные вашего инстанса GREEN-API</p>
      </div>

      <Input
        {...register('apiUrl')}
        label="apiUrl"
        placeholder="https://3100.api.green-api.com"
        autoComplete="off"
        error={errors.apiUrl?.message}
      />

      <Input
        {...register('idInstance')}
        label="idInstance"
        placeholder="Введите idInstance"
        autoComplete="off"
        error={errors.idInstance?.message}
      />

      <Input
        {...register('apiTokenInstance')}
        label="apiTokenInstance"
        type="password"
        placeholder="Введите apiTokenInstance"
        autoComplete="off"
        error={errors.apiTokenInstance?.message}
      />

      {submitError && <div className={styles.submitError}>{submitError}</div>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Проверяем...' : 'Войти'}
      </Button>
    </form>
  );
};
