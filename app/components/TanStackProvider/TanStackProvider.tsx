'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

interface TanStackProviderProps {
  children: ReactNode;
}

export default function TanStackProvider({ children }: TanStackProviderProps) {
  // Створюємо один екземпляр QueryClient на час життя провайдера
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
