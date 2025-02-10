<script lang="ts" setup>
import { NuxtErrorBoundary } from '#components';
import TemplateOne from '~/components/valentines/TemplateOne.vue';
import { VALENTINE_NOT_FOUND_ERR } from '~/constants';

const id = useRoute().params.id;

const { data, status } = await useValentine(String(id));

if (!data.value) {
  throw showError(VALENTINE_NOT_FOUND_ERR);
}

const description = computed(() => {
  return status.value === 'pending'
    ? 'Завантаження...'
    : `Від ${data.value?.from}`;
});

useSeoMeta({
  title: 'Вам надіслали валентинку',
  description,
  ogTitle: '%s',
  ogType: 'website',
});

defineOgImageComponent('NuxtSeo', {
  title: 'Вам надіслали валентинку',
  description,
  theme: '#e9110b',
  colorMode: 'light',
});
</script>

<template>
  <TemplateOne
    v-if="data?.template === 'template-1'"
    :to="data.to"
    :text="data.text"
    :from="data.from"
  />
</template>
