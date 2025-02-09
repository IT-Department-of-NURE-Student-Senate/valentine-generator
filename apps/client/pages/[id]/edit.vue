<script lang="ts" setup>
const valentineId = ref(String(useRouteParams('id')));
</script>

<template>
  <div class="flex flex-col gap-4 size-full items-center justify-center">
    <Stepper :id="valentineId" />
  </div>
</template>
