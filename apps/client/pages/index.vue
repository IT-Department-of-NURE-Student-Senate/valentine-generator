<script lang="ts" setup>
const valentineId = useCookie('valentine-card-id');

const { handleRedirect } = useValentineRedirect();

const valentineStore = useValentineStore();
const stepperStore = useStepperStore();

onMounted(() => {
  valentineStore.reset();
  stepperStore.reset();
  valentineId.value = '';
});
</script>

<template>
  <div
    class="flex flex-col w-full items-center md:gap-10 gap-4 md:mb-28 max-md:p-2"
  >
    <p class="font-inter text-2xl text-center leading-relaxed">
      Створіть незабутні відчуття для своєї другої половинки <br />
      Відправте
      <em
        class="font-excali whitespace-nowrap bg-primary/30 selection:bg-transparent p-2 rounded-md"
        >віртуальну валентинку</em
      >
      будь-кому!
    </p>
    <Button class="h-12 text-base" @click="handleRedirect()">
      <Icon class="size-6" name="lucide:plus" />
      Створити
    </Button>
  </div>
  <HornyIcon />
</template>
