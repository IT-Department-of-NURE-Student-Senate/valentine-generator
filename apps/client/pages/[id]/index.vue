<script lang="ts" setup>
import { NuxtErrorBoundary } from '#components';
import TemplateOne from '~/components/valentines/TemplateOne.vue';
import { VALENTINE_NOT_FOUND_ERR } from '~/constants';

const id = useRoute().params.id;

const { data } = await useValentine(String(id));

if (!data.value) {
  throw showError(VALENTINE_NOT_FOUND_ERR);
}
</script>

<template>
  <TemplateOne
    v-if="data?.template === 'template-1'"
    :to="data.to"
    :text="data.text"
    :from="data.from"
  />
</template>
