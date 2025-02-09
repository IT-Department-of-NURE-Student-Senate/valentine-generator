<script lang="ts" setup>
import TemplateOne from '~/components/valentines/TemplateOne.vue';
import { VALENTINE_COOKIE_KEY } from '~/constants';

const id = useCookie(VALENTINE_COOKIE_KEY);

const store = useValentineStore();

const { data } = storeToRefs(store);
</script>

<template>
  <div
    class="inline-flex absolute w-3/6 top-2 bg-white p-2 rounded-md items-center justify-start gap-1 z-50"
  >
    <Button variant="ghost" size="icon" as-child>
      <NuxtLink :to="`/${id}/edit`">
        <Icon name="lucide:chevron-left" class="size-5" />
      </NuxtLink>
    </Button>
    <p class="font-excali text-lg">Режим попереднього перегляду</p>
  </div>
  <TemplateOne
    v-if="data.template === 'template-1'"
    :text="data.text"
    :to="data.to"
    :from="data.from"
  />
</template>
