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
  <div class="flex flex-col w-full mx-auto min-h-dvh">
    <div
      class="w-full"
      :style="{
        background:
          'radial-gradient(94.39% 76.37% at 50% 134.15%, #E11C47 0%, #FFF 100%)',
      }"
    >
      <div
        class="flex flex-col w-full h-dvh items-center justify-center gap-6 container"
      >
        <p class="font-inter text-2xl text-center leading-relaxed">
          Створіть незабутні відчуття для своєї другої половинки <br />
          Відправте
          <em
            class="font-excali inline-block whitespace-nowrap bg-primary/30 selection:bg-transparent p-2 rounded-md"
          >
            віртуальну валентинку
          </em>
        </p>

        <div class="flex gap-3">
          <Button class="h-12 text-base" @click="handleRedirect()">
            <Icon class="size-6" name="lucide:plus" />
            Створити
          </Button>
          <Button class="h-12 text-base" variant="outline">
            <NuxtLink to="#how-it-works"> Як це працює? </NuxtLink>
          </Button>
        </div>

        <HornyIcon />
      </div>
    </div>

    <div
      class="w-full"
      :style="{
        background:
          'radial-gradient(94.39% 76.37% at 50% -34.15%, #E11C47 0%, #FFF 100%)',
      }"
    >
      <div
        class="flex flex-col mx-auto md:w-2/4 w-full h-max items-center gap-6 pb-14 container"
      >
        <h2 id="how-it-works" class="text-3xl font-excali">Як це працює?</h2>

        <GuideSteps />

        <div class="flex items-center justify-center w-full">
          <Button class="h-12 text-base" @click="handleRedirect()">
            <Icon class="size-6" name="lucide:plus" />
            Створити
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
