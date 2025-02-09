<script lang="ts" setup>
const valentineId = String(useRoute().params.id);

console.log(valentineId);
</script>

<template>
  <div
    class="flex flex-col gap-4 size-full items-center justify-center overflow-hidden p-2"
  >
    <Stepper :id="valentineId" />
  </div>
</template>
