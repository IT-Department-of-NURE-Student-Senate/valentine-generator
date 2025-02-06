import type { StepperData } from '~/types';

export const useValentineStore = defineStore(
  'valentine-card-info',
  () => {
    const data = ref<StepperData>({
      text: '',
      from: '',
      to: '',
      template: 'template-1',
    });

    const reset = () => {
      data.value = {
        template: 'template-1',
        text: '',
        to: '',
        from: '',
      };
    };

    return { data, reset };
  },
  { persist: true },
);
