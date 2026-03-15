'use client';

import dynamic from 'next/dynamic';

const AppRouter = dynamic(() => import('@/components/app-router').then((m) => m.AppRouter), {
  ssr: false,
});

export default function CatchAllPage() {
  return <AppRouter />;
}
