'use client';

import { NewChallengeForm } from './new-challenge-form';

export function NewChallengePage() {
  return (
    <main className="flex-1 flex flex-col overflow-y-auto px-11 py-9">
      <NewChallengeForm />
    </main>
  );
}
