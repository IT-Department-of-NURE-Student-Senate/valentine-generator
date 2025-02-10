<script lang="ts" setup>
const { websiteBaseUrl } = useRuntimeConfig().public;

useSeoMeta({
  title: 'Головна',
  description:
    'Створіть незабутні відчуття для своєї другої половинки, відправте віртуальну валентинку',
  ogTitle: '%s',
  ogDescription:
    'Створіть незабутні відчуття для своєї другої половинки, відправте віртуальну валентинку',
  ogUrl: `${websiteBaseUrl}/`,
  ogType: 'website',
});

defineOgImageComponent('NuxtSeo', {
  title: 'Головна',
  description:
    'Створіть незабутні відчуття для своєї другої половинки, відправте віртуальну валентинку',
  theme: '#e9110b',
  colorMode: 'light',
});

const { handleRedirect } = useValentineRedirect();

const valentineStore = useValentineStore();
const stepperStore = useStepperStore();

onMounted(() => {
  valentineStore.reset();
  stepperStore.reset();
});
</script>

<template>
  <div
    class="flex flex-col w-full h-dvh items-center justify-center md:gap-10 gap-4 max-md:p-2"
    :style="{
      background:
        'radial-gradient(94.39% 76.37% at 50% 134.15%, #E11C47 0%, #FFF 100%)',
    }"
  >
    <p class="font-inter text-2xl text-center leading-relaxed">
      Створіть незабутні відчуття для своєї другої половинки <br />
      Відправте
      <em
        class="font-excali whitespace-nowrap bg-primary/30 selection:bg-transparent p-2 rounded-md"
      >
        віртуальну валентинку
      </em>
    </p>
    <div class="inline-flex gap-3 flex-wrap">
      <Button class="h-12 text-base" @click="handleRedirect()">
        <Icon class="size-6" name="lucide:plus" />
        Створити
      </Button>
      <Button class="h-12 text-base" variant="outline">
        <NuxtLink to="#how-it-works"> Як це працює? </NuxtLink>
      </Button>
    </div>
  </div>
  <div
    class="flex flex-col w-full h-dvh items-center justify-center"
    :style="{
      background:
        'radial-gradient(94.39% 76.37% at 50% -34.15%, #E11C47 0%, #FFF 100%)',
    }"
  >
    <h2 id="how-it-works" class="text-3xl font-excali mb-5">Як це працює?</h2>
    <div class="grid grid-cols-2 w-2/4 gap-x-5">
      <div class="p-4">
        <p class="text-xl font-excali">Крок 1:</p>
        <p>Настисніть на кнопку "Створити"</p>
      </div>
      <div class="flex w-full justify-end p-4">
        <NuxtImg src="/1.png" />
      </div>
      <div class="flex w-full justify-start p-4">
        <NuxtImg src="/2.png" />
      </div>
      <div class="flex flex-col w-full justify-center p-4">
        <p class="text-xl font-excali text-end">Крок 2:</p>
        <p class="text-end">Заповність форму та натисність "Опублікувати"</p>
      </div>
      <div class="flex flex-col w-full justify-center p-4">
        <p class="text-xl font-excali">Крок 3:</p>
        <p>Скопіюйте посилання та поділіться ним</p>
      </div>
      <div class="flex w-full items-center justify-end p-4">
        <NuxtImg src="/3.png" />
      </div>
    </div>
    <Button class="h-12 text-base mt-5" @click="handleRedirect()">
      <Icon class="size-6" name="lucide:plus" />
      Створити
    </Button>
  </div>
  <HornyIcon />
</template>
