<script lang="ts" setup>
defineProps<{ text: string; from: string; to: string }>();
</script>

<template>
  <main
    class="flex flex-col w-full h-dvh bg-[#fface1] items-center justify-center"
  >
    <Icon name="vt:one" class="size-3/4" />
    <p class="absolute bottom-12 font-excali">
      З любовʼю від IT-відділу Студентського сенату ХНУРЕ!
    </p>
    <p
      v-html="text.replaceAll('\n', '<br>')"
      class="absolute font-oranienbaum top-[17%] left-[23%] text-wrap text-[#e9110b] text-5xl"
    />
    <p
      class="absolute font-inter bottom-[17%] left-[24%] text-wrap text-black text-2xl"
    >
      {{ generateText(from, to) }}
    </p>
  </main>
</template>
