<script lang="ts" setup>
import { VALENTINE_COOKIE_KEY } from '~/constants';

const cookie = useCookie(VALENTINE_COOKIE_KEY, {
  watch: true,
});

const id = useRouteParams('id');

if (!cookie.value || cookie.value !== id.value) {
  throw showError({
    status: 400,
    message: 'Упс... ви не можете відкрити цю сторінку',
    fatal: true,
  });
}
</script>

<template>
  <div class="flex flex-col gap-4 size-full items-center justify-center">
    <Stepper :id="id as string" />
  </div>
</template>
