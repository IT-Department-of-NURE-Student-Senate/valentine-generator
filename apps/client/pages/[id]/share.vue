<script lang="ts" setup>
import { VALENTINE_NOT_FOUND_ERR } from '~/constants';

const id = useRouteParams('id');

const { data } = await useValentine(String(id.value));

if (!data.value) {
  throw showError(VALENTINE_NOT_FOUND_ERR);
}

const shareIcon = ref('lucide:copy');

const { link, copy, socialLinks } = useShare(data.value!);

const handleCopy = async () => {
  try {
    await copy(link);
    shareIcon.value = 'lucide:check';
    setTimeout(() => {
      shareIcon.value = 'lucide:copy';
    }, 274);
  } catch (error) {
    console.error('Failed to copy:', error);
  }
};

useSeoMeta({
  title: 'Поділіться валентинкою',
  ogTitle: '%s',
  ogType: 'website',
});

defineOgImageComponent('NuxtSeo', {
  title: 'Поділіться валентинкою',
  theme: '#e9110b',
  colorMode: 'light',
});
</script>

<template>
  <div
    class="flex flex-col w-full items-center md:gap-10 gap-4 md:mb-28 max-md:p-2"
  >
    <p class="font-excali text-2xl text-center">
      Вашу валентинку опубліковано!
    </p>
    <p class="text-center">
      Ви можете поділитися нею за посиланням, доступним знизу
    </p>
    <div class="relative w-full items-center sm:w-[400px]">
      <Input v-model="link" type="text" readonly class="pr-10" />
      <span
        class="absolute end-0 inset-y-0 flex items-center justify-center px-1"
      >
        <Button
          class="size-8"
          variant="ghost"
          size="icon"
          @click="handleCopy()"
        >
          <Icon :name="shareIcon" />
        </Button>
      </span>
    </div>
    <div class="inline-flex w-full items-center justify-center gap-1">
      <Button
        v-for="{ link, icon } in socialLinks"
        variant="ghost"
        size="icon"
        as-child
      >
        <NuxtLink :to="link" target="_blank">
          <Icon :name="icon" />
        </NuxtLink>
      </Button>
    </div>
  </div>
  <HornyIcon />
</template>
