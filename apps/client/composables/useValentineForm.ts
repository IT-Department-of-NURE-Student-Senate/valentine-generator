import type { StepperData } from '~/types';

export const useValentineForm = () => {
  const { apiBaseUrl } = useRuntimeConfig().public;

  const isSuccess = ref(false);
  const isPending = ref(false);

  const submit = async (data: StepperData & { id: string }) => {
    try {
      isPending.value = true;

      const url = `${apiBaseUrl}/valentines`;

      await $fetch(url, {
        method: 'POST',
        body: data,
        credentials: 'include',
      });

      isSuccess.value = true;
    } catch (e: unknown) {
      console.log(e);
    } finally {
      isPending.value = false;
    }
  };

  return { submit, isPending, isSuccess };
};
