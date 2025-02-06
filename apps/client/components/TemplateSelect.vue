<script lang="ts" setup>
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { RadioGroupRoot, RadioGroupItem } from 'radix-vue';

const store = useValentineStore();

const { data } = storeToRefs(store);

const templates = [
  {
    value: 'template-1',
    src: '/template-1.webp',
  },
];

const selectedTemplate = computed(() => {
  return templates.find((template) => template.value === data.value.template)
    ?.src!;
});
</script>

<template>
  <NuxtImg
    class="flex flex-col w-3/6 h-3/6 border rounded-md"
    :src="selectedTemplate"
    fit="contain"
  />
  <ScrollArea class="border border-muted rounded-xl w-2/5 bg-white">
    <RadioGroupRoot v-model="data.template" class="flex p-4 space-x-4 w-max">
      <RadioGroupItem
        v-for="template in templates"
        :key="template.value"
        :value="template.value"
        as-child
      >
        <NuxtImg
          class="w-40 h-28 border rounded-md data-[state='checked']:border-primary bg-slate-100"
          width="160"
          height="112"
          :src="template.src"
          fit="cover"
        />
      </RadioGroupItem>
    </RadioGroupRoot>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
</template>
