'use client';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Sidebar } from '@/components/layout/sidebar';
import { HomePage } from '@/features/habits/components/home-page';
import { NewChallengePage } from '@/features/habits/components/new-challenge-page';

export function AppRouter() {
  return (
    <BrowserRouter>
      <div className="flex h-full w-full overflow-hidden">
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<NewChallengePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
