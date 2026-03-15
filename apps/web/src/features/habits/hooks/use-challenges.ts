import { useCallback, useEffect, useState } from 'react';

import { Challenge, ChallengeStats } from '@/types/challenge';

import {
  getChallenges,
  getChallengeStats,
} from '@/features/habits/services/challenge.service';

export function useChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const data = await getChallenges();
    setChallenges(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { challenges, loading, refetch: fetch };
}

export function useChallengeStats() {
  const [stats, setStats] = useState<ChallengeStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    setLoading(true);
    const data = await getChallengeStats();
    setStats(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { stats, loading, refetch: fetch };
}
