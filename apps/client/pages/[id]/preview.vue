<script lang="ts" setup>
import TemplateOne from '~/components/valentines/TemplateOne.vue';

const id = useCookie('valentine-card-id');

const store = useValentineStore();

const { data } = storeToRefs(store);
</script>

<template>
  <div
    class="inline-flex absolute md:w-3/6 w-max max-md:right-2 top-2 bg-white p-2 rounded-md items-center justify-start gap-1 z-50"
  >
    <Button variant="ghost" size="icon" as-child>
      <NuxtLink :to="`/${id}/edit`">
        <Icon name="lucide:chevron-left" class="size-5" />
      </NuxtLink>
    </Button>
    <p class="font-excali text-lg max-md:hidden">
      Режим попереднього перегляду
    </p>
  </div>
  <TemplateOne
    v-if="data.template === 'template-1'"
    :text="data.text"
    :to="data.to"
    :from="data.from"
  />
</template>
