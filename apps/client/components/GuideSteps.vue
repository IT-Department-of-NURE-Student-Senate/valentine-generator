<script lang="ts" setup>
const guideSteps = computed(() => {
  return [
    {
      description: 'Настисніть на кнопку "Створити"',
      image: '/1.webp',
    },
    {
      description: 'Заповність форму та натисність "Опублікувати"',
      image: '/2.webp',
    },
    {
      description: 'Скопіюйте посилання та поділіться ним',
      image: '/3.webp',
    },
  ];
});
</script>

<template>
  <template v-for="(step, index) in guideSteps" :key="index">
    <div
      class="flex items-center justify-between w-full border border-dashed border-gray-500 rounded-xl p-6 max-md:flex-col max-md:text-center"
      :class="[index % 2 === 1 ? 'flex-row-reverse' : '']"
    >
      <div class="p-4" :class="[index % 2 === 1 ? 'md:text-end' : '']">
        <p class="text-xl font-excali max-md:text-center">
          Крок {{ index + 1 }}:
        </p>
        <p>{{ step.description }}</p>
      </div>
      <img class="md:w-1/4 w-3/4 pointer-events-none" :src="step.image" />
    </div>
  </template>
</template>
