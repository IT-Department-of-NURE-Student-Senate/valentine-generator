<script lang="ts" setup>
import { nanoid } from 'nanoid';

const valentineId = useCookie('valentine-card-id');

const handleRedirect = () => {
  const id = nanoid(12);

  valentineId.value = id;

  return navigateTo(`/${id}/edit`);
};

const valentineStore = useValentineStore();
const stepperStore = useStepperStore();

onMounted(() => {
  valentineStore.reset();
  stepperStore.reset();
});
</script>

<template>
  <div class="flex flex-col w-full items-center gap-10 mb-28">
    <p class="font-inter text-2xl text-center leading-relaxed">
      Створіть незабутні відчуття для своєї другої половинки <br />
      Відправте
      <em
        class="font-excali bg-primary/30 selection:bg-transparent p-2 rounded-md"
        >віртуальну валентинку</em
      >
      будь-кому!
    </p>
    <Button class="h-12 text-base" @click="handleRedirect()">
      <Icon class="size-6" name="lucide:plus" />
      Створити
    </Button>
  </div>
  <div class="flex flex-col items-center absolute bottom-20">
    <Icon name="vi:horny" class="size-64" />
    <p class="text-xl font-excali">
      З любовʼю від IT-відділу Студентського сенату ХНУРЕ!
    </p>
  </div>
</template>
