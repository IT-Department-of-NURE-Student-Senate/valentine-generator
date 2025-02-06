import type { Valentine } from '~/types';

export const useValentine = (id: string) => {
  return useAsyncData(`valentine-${id}`, async () => {
    const { apiBaseUrl } = useRuntimeConfig().public;

    try {
      const response = await $fetch<Valentine>(
        `${apiBaseUrl}/valentines/${id}`,
      );

      return response;
    } catch {
      throw createError({
        status: 404,
        message: 'Валентинка не знайдена',
      });
    }
  });
};
