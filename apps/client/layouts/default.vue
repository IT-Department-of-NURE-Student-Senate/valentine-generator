<script lang="ts" setup></script>

<template>
  <main
    class="flex flex-col size-full items-center justify-center gap-10"
    :style="{
      background:
        'radial-gradient(94.39% 76.37% at 50% 134.15%, #E11C47 0%, #FFF 100%)',
    }"
  >
    <!-- <header class="absolute top-9 w-3/4 rounded-lg border border-muted-foreground p-4 box-border">
      <p class="text-inter">З любовʼю від ХНУРЕ!</p>
    </header> -->
    <slot />
  </main>
</template>
