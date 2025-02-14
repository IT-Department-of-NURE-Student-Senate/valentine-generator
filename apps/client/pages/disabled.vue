// pages/maintenance.vue
<script lang="ts" setup>
const { websiteBaseUrl } = useRuntimeConfig().public;
useSeoMeta({
  title: 'День святого Валентина завершився',
  description:
    'Дякуємо, що були з нами в цей особливий день. На жаль, наразі сервіс недоступний',
  ogTitle: '%s',
  ogDescription:
    'Дякуємо, що були з нами в цей особливий день. На жаль, наразі сервіс недоступний',
  ogUrl: `${websiteBaseUrl}/disabled`,
  ogType: 'website',
});
defineOgImageComponent('NuxtSeo', {
  title: 'День святого Валентина завершився',
  description:
    'Дякуємо, що були з нами в цей особливий день. На жаль, наразі сервіс недоступний',
  theme: '#e9110b',
  colorMode: 'light',
});
</script>
<template>
  <div
    class="flex flex-col w-full mx-auto min-h-dvh items-center justify-center gap-6 container"
  >
    <p class="font-inter text-2xl text-center leading-relaxed">
      День святого Валентина 2025 завершився <br />
      <em
        class="font-excali inline-block whitespace-nowrap bg-primary/30 selection:bg-transparent p-2 rounded-md"
      >
        Дякуємо, що були з нами
      </em>
    </p>
    <div
      class="flex items-center justify-between border-2 border-dashed border-pink-300 rounded-xl p-8 bg-pink-50/30 backdrop-blur-sm shadow-inner max-md:flex-col max-md:text-center"
    >
      <p class="font-excali text-xl text-red-500">
        На жаль, через технічні складнощі та незалежні від нас обставини 😔
        <br />
        сервіс наразі недоступний
      </p>
    </div>
    <div class="flex flex-col items-center gap-4 mt-4">
      <Icon
        name="lucide:heart-handshake"
        class="size-24 text-red-500 animate-pulse"
      />
      <p class="font-excali text-lg text-red-500 text-center">
        Сподіваємось побачити Вас наступного року! 💝
      </p>
    </div>
    <div class="flex items-center">
      <NuxtLink
        class="w-48 mt-5"
        to="https://t.me/mindenit"
        target="_blank"
        rel="noopener"
      >
        <img src="/mindenit.webp" alt="Mindenit" />
      </NuxtLink>
    </div>
  </div>
</template>
