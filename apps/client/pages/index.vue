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
const { count, error, isPending } = useValentinesCount();

const valentineStore = useValentineStore();
const stepperStore = useStepperStore();

const howItWorksSection = ref<HTMLElement | null>(null);

const scrollToSection = (event: Event) => {
  event.preventDefault();
  howItWorksSection.value?.scrollIntoView({ behavior: 'smooth' });
};

onMounted(() => {
  valentineStore.reset();
  stepperStore.reset();
});
</script>

<template>
  <div class="flex flex-col w-full mx-auto min-h-dvh">
    <div
      class="w-full mt-10"
      :style="{
        background:
          'radial-gradient(94.39% 76.37% at 50% 134.15%, #E11C47 0%, #FFF 100%)',
      }"
    >
      <div
        class="flex flex-col w-full min-h-dvh items-center justify-center gap-6 container"
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
          <Button
            class="h-12 text-base"
            variant="outline"
            @click="scrollToSection"
          >
            Як це працює?
          </Button>
        </div>

        <div
          class="flex items-center justify-between border-2 border-dashed border-pink-300 rounded-xl p-8 bg-pink-50/30 backdrop-blur-sm shadow-inner max-md:flex-col max-md:text-center"
        >
          <p
            v-if="isPending"
            class="font-excali text-xl text-red-500 animate-pulse"
          >
            Рахуємо валентинки... 💌
          </p>
          <p v-else-if="error" class="font-excali text-xl text-red-500">
            Сталася помилка при отриманні даних 😢
          </p>
          <p v-else class="font-excali text-xl text-red-500">
            {{ count }} валентинок знайшли своїх адресатів ✨
          </p>
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
        <h2 ref="howItWorksSection" class="text-3xl font-excali mt-5">
          Як це працює?
        </h2>

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
