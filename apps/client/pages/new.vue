<script lang="ts" setup>
import type { StepperData } from '~/types';

const handleSubmit = (data: StepperData) => {
  localStorage.setItem('q12', JSON.stringify(data));
};
</script>

<template>
  <div class="flex flex-col gap-4 size-full items-center justify-center">
    <Stepper @submit="handleSubmit" />
    <!-- <NuxtLink to="/" class="text-black hover:text-primary focus:text-primary hover:underline focus:underline">Повернутися на головну</NuxtLink> -->
  </div>
</template>
