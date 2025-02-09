import type { Valentine } from '~/types';

export const useValentine = (id: string) => {
  return useAsyncData(`valentine-${id}`, async () => {
    const { apiBaseUrl } = useRuntimeConfig().public;

    const response = await fetch(`${apiBaseUrl}/valentines/${id}`);

    if (!response.ok) {
      return null;
    }

    const valentine = await response.json();

    return valentine as Valentine;
  });
};
