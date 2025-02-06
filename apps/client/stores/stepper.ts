export const useStepperStore = defineStore(
  'stepper',
  () => {
    const currentStep = ref(0);
    const isFirst = computed(() => currentStep.value === 0);

    const nextStep = () => {
      if (currentStep.value < 3) {
        currentStep.value++;
      }
    };

    const previousStep = () => {
      if (currentStep.value > 0) {
        currentStep.value--;
      }
    };

    const reset = () => (currentStep.value = 0);

    return { currentStep, isFirst, nextStep, previousStep, reset };
  },
  {
    persist: true,
  },
);
