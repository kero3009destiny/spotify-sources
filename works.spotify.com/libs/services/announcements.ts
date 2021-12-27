import { get, post } from './request';
import { BACKEND_URL } from './s4p';
import { useCallback } from 'react';
import { useQuery, useQueryCache, useMutation } from 'react-query';

export const preBetaTermsAndConditions = 't&cv1';
export const preSongwriterPagesTermsAndConditions = 't&cv2';
export const currentTermsAndConditions = 't&cv3';

export const getAcceptedAnnouncements = async (): Promise<string[]> => {
  const response = await get(`${BACKEND_URL}/v3/announcements`);
  const parsedResponse = await response.json();
  return parsedResponse;
};

export const acceptAnnouncement = async (name: string) => {
  const response = await post(`${BACKEND_URL}/v3/announcements/${name}`);
  if (response.status !== 201) throw new Error(String(response.status));
  return response;
};

export function useAnnouncements() {
  const cache = useQueryCache();

  const response = useQuery(['announcements'], () => getAcceptedAnnouncements());

  const [mutate] = useMutation(
    ({ announcement }: { announcement: string }) => acceptAnnouncement(announcement),
    {
      onMutate: ({ announcement }) => {
        cache.setQueryData<string[]>(['announcements'], (old) => [...(old ?? []), announcement]);
      },
    },
  );

  const accept = useCallback((announcement: string) => mutate({ announcement }), [mutate]);

  return {
    accepted: response.data!,
    acceptAnnouncement: accept,
  };
}
