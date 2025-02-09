<script lang="ts" setup>
import TemplateOne from '~/components/valentines/TemplateOne.vue';

const id = useRoute().params.id;

const { data } = await useValentine(String(id));

if (!data.value) {
  throw createError({
    status: 404,
    message: 'Валентинка не знайдена',
  });
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
