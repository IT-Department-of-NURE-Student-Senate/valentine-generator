export const useStepper = (initialStep?: number) => {
  const currentStep = ref(initialStep ?? 0);
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

  return { currentStep, isFirst, nextStep, previousStep };
};
