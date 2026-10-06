# GREEN-API MAX Chat

Тестовое задание на позицию Frontend Developer React.
Приложение представляет собой минимальный веб-клиент для отправки и получения текстовых сообщений в MAX через GREEN-API.

## Возможности

- авторизация по `idInstance` и `apiTokenInstance`;
- проверка состояния инстанса;
- создание чата по номеру телефона;
- отправка текстовых сообщений через `SendMessage`;
- получение входящих сообщений через HTTP API;
- удаление обработанных уведомлений через `DeleteNotification`;
- несколько чатов;
- сохранение локальной истории сообщений;
- сортировка чатов по последней активности;
- отображение последнего сообщения и времени в списке чатов.

## Стек

- React
- TypeScript
- Vite
- React Hook Form
- Zod
- CSS Modules
- Lucide React

## Запуск проекта

### Требования

- Node.js 20+
- npm

### Установка

```bash
git clone <repository-url>
cd green-api-chat
npm install
```

### Запуск в development-режиме

```bash
npm run dev
```

После запуска приложение будет доступно по адресу:

```bash
http://localhost:5173
```
