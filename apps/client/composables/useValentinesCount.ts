import type { Statistics } from '~/types';

export const useValentinesCount = () => {
  const config = useRuntimeConfig();
  const count = ref<number>(0);
  const error = ref<Error | null>(null);
  const isPending = ref(false);

  const fetchCount = async () => {
    try {
      isPending.value = true;
      error.value = null;

      const response = await $fetch<Statistics>(
        `${config.public.apiBaseUrl}/statistics`,
      );
      count.value = response.totalValentines;
    } catch (e) {
      error.value = e as Error;
      console.error('Failed to fetch valentines count:', e);
    } finally {
      isPending.value = false;
    }
  };

  fetchCount();

  return {
    count,
    error,
    isPending,
    refresh: fetchCount,
  };
};
