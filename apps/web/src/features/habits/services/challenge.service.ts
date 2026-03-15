import { apiClient } from '@/lib/axios';
import { Challenge, ChallengeCategory, ChallengeStats } from '@/types/challenge';

import { API_PATHS } from '@/features/habits/constants';

export async function getChallenges(): Promise<Challenge[]> {
  const { data } = await apiClient.get<Challenge[]>(API_PATHS.CHALLENGES);
  return data;
}

export async function getChallengeStats(): Promise<ChallengeStats> {
  const { data } = await apiClient.get<ChallengeStats>(
    API_PATHS.CHALLENGES_STATS,
  );
  return data;
}

export async function createChallenge(params: {
  title: string;
  reason?: string;
  category: ChallengeCategory;
}): Promise<Challenge> {
  const { data } = await apiClient.post<Challenge>(
    API_PATHS.CHALLENGES,
    params,
  );
  return data;
}
