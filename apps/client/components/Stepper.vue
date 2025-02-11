<script lang="ts" setup>
import TemplateOne from '~/components/valentines/TemplateOne.vue';
import { STEPPER_TITLES } from '~/constants';

const props = defineProps<{ id: string }>();

const store = useValentineStore();

const { data } = storeToRefs(store);

const stepperStore = useStepperStore();

const { currentStep, isFirst } = storeToRefs(stepperStore);

const getFieldState = (text: string, maxLength: number) => {
  const percentage = (text.length / maxLength) * 100;

  return {
    length: text.length,
    color:
      percentage < 70
        ? 'text-muted-foreground'
        : percentage < 90
          ? 'text-yellow-500'
          : 'text-red-500',
  };
};

const fieldState = computed(() => ({
  text: getFieldState(data.value.text, 50),
  to: getFieldState(data.value.to, 25),
  from: getFieldState(data.value.from, 25),
}));

const conditions = computed(() => {
  return [data.value.text, data.value.to, data.value.from].map(
    (item) => !item.trim().length,
  );
});

const { submit, isPending, isSuccess } = useValentineForm();

const handleSubmit = async () => {
  await submit({ ...data.value, id: props.id });

  if (isSuccess.value) {
    return navigateTo(`/${props.id}/share`);
  }
};

const buttonFallback = computed(() =>
  isPending.value ? 'Публікуємо...' : 'Опублікувати',
);
</script>

<template>
  <Card class="md:w-[440px] w-full" v-if="currentStep >= 0 && currentStep <= 2">
    <CardHeader>
      <CardTitle class="font-excali text-center">
        {{ STEPPER_TITLES[currentStep] }}
      </CardTitle>
    </CardHeader>

    <CardContent class="space-y-2" v-if="currentStep === 0">
      <Textarea
        v-model="data.text"
        class="resize-none"
        placeholder="Введи текст..."
        maxlength="50"
        autofocus
      />
      <div class="flex w-full justify-between">
        <p class="text-sm text-muted-foreground">Максимум 50 символів</p>
        <p
          class="text-sm transition-all duration-200"
          :class="fieldState.text.color"
        >
          <span class="inline-block transition-transform duration-200">
            {{ fieldState.text.length }}/50
          </span>
        </p>
      </div>
    </CardContent>

    <CardContent class="space-y-2" v-if="currentStep === 1">
      <Input
        v-model="data.to"
        type="text"
        placeholder="Введи імʼя..."
        maxlength="25"
      />
      <div class="flex w-full justify-between">
        <p class="text-sm text-muted-foreground">Максимум 25 символів</p>
        <p
          class="text-sm transition-all duration-200"
          :class="fieldState.to.color"
        >
          <span class="inline-block transition-transform duration-200">
            {{ fieldState.to.length }}/25
          </span>
        </p>
      </div>
    </CardContent>

    <CardContent class="space-y-2" v-if="currentStep === 2">
      <Input
        v-model="data.from"
        type="text"
        placeholder="Введи імʼя..."
        maxlength="25"
      />
      <div class="flex w-full justify-between">
        <p class="text-sm text-muted-foreground">Максимум 25 символів</p>
        <p
          class="text-sm transition-all duration-200"
          :class="fieldState.from.color"
        >
          <span class="inline-block transition-transform duration-200">
            {{ fieldState.from.length }}/25
          </span>
        </p>
      </div>
    </CardContent>
    <CardFooter class="inline-flex w-full justify-between items-center gap-3">
      <Button
        variant="outline"
        @click="stepperStore.previousStep()"
        :disabled="isFirst"
        >Назад</Button
      >
      <Button
        @click="stepperStore.nextStep()"
        :disabled="conditions[currentStep]"
        >Далі</Button
      >
    </CardFooter>
  </Card>
  <div v-else class="flex flex-col size-full justify-center items-center gap-5">
    <div
      class="inline-flex absolute md:w-3/6 max-md:bg-transparent max-md:w-full md:top-3 max-md:bottom-2 bg-white p-2 rounded-md items-center justify-between gap-1 z-50"
    >
      <Button
        class="max-md:bg-white"
        variant="ghost"
        size="icon"
        @click="stepperStore.previousStep()"
      >
        <Icon name="lucide:chevron-left" class="size-5" />
      </Button>
      <Button @click="handleSubmit">
        {{ buttonFallback }}
      </Button>
    </div>
    <TemplateOne
      v-if="data.template === 'template-1'"
      :text="data.text"
      :to="data.to"
      :from="data.from"
    />
  </div>
  <NuxtLink
    v-show="currentStep <= 2"
    class="text-primary hover:underline focus:underline"
    to="/"
  >
    Повернутися на головну
  </NuxtLink>
</template>
