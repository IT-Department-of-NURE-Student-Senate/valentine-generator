<script setup lang="ts">
const error = useError();

const { handleRedirect } = useValentineRedirect();

const handleError = () => {
  clearError({
    redirect: '/',
  });
};
</script>

<template>
  <NuxtLayout>
    <div
      v-if="error?.statusCode === 404"
      class="flex flex-col w-full items-center gap-3 mb-28"
    >
      <em
        class="font-excali text-5xl text-center leading-relaxed bg-primary/30 selection:bg-transparent p-2 rounded-md"
      >
        {{ error?.statusCode }}
      </em>
      <p class="text-inter text-xl lg:w-2/5 md:w-3/5 break-words text-center">
        Блін, нажаль ми не знайшли цю валентинку, але не розстраюйся, ти завжди
        <NuxtLink
          @click="handleRedirect()"
          class="font-excali cursor-pointer leading-relaxed bg-primary/30 selection:bg-transparent p-1 rounded-md"
          >можеш створити свою!</NuxtLink
        >
      </p>
      <Button variant="outline" @click="handleError"> На головну </Button>
    </div>
    <div v-else class="flex flex-col w-full items-center gap-3 mb-28">
      <em
        class="font-excali text-5xl text-center leading-relaxed bg-primary/30 selection:bg-transparent p-2 rounded-md"
      >
        {{ error?.statusCode }}
      </em>
      <p class="text-inter text-xl lg:w-2/5 md:w-3/5 break-words text-center">
        {{ error?.message }}
      </p>
      <Button variant="outline" @click="handleError"> На головну </Button>
    </div>
    <div class="flex flex-col items-center absolute bottom-20">
      <Icon name="vi:horny" class="size-64" />
      <p class="text-xl font-excali">
        З любовʼю від IT-відділу Студентського сенату ХНУРЕ!
      </p>
    </div>
  </NuxtLayout>
</template>
