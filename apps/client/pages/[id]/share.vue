<script lang="ts" setup>
import { VALENTINE_NOT_FOUND_ERR } from '~/constants';

const id = useRouteParams('id');

const { data } = await useValentine(String(id.value));

if (!data.value) {
  throw showError(VALENTINE_NOT_FOUND_ERR);
}

const shareIcon = ref('lucide:copy');

const { link, copy, socialLinks } = useShare(data.value!);

const handleCopy = () => {
  copy();

  shareIcon.value = 'lucide:check';

  setTimeout(() => {
    shareIcon.value = 'lucide:copy';
  }, 274);
};
</script>

<template>
  <div class="flex flex-col gap-2 mb-28">
    <p class="font-excali text-2xl text-center">
      Вашу валентинку опубліковано!
    </p>
    <p class="text-center">
      Ви можете поділитися нею за посиланням, доступним внизу
    </p>
    <div class="relative w-full items-center">
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
  <div class="flex flex-col items-center absolute bottom-20">
    <Icon name="vi:horny" class="size-64" />
    <p class="text-xl font-excali">
      З любовʼю від IT-відділу Студентського сенату ХНУРЕ!
    </p>
  </div>
</template>
