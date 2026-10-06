import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { messageSchema, type MessageFormValues } from '../model/message.schema';
import styles from './MessageInput.module.css';

type MessageInputProps = {
  onSubmit: (message: string) => Promise<boolean>;
  isLoading: boolean;
  error?: string | null;
};

export const MessageInput = ({ onSubmit, isLoading, error }: MessageInputProps) => {
  const { register, handleSubmit, reset } = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: '',
    },
  });

  const handleFormSubmit = async (values: MessageFormValues) => {
    const isSent = await onSubmit(values.message);

    if (isSent) {
      reset();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <input
        {...register('message')}
        className={styles.input}
        placeholder="Сообщение"
        autoComplete="off"
      />

      <button
        className={styles.sendButton}
        type="submit"
        disabled={isLoading}
        aria-label="Отправить"
      >
        ↑
      </button>

      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
};
