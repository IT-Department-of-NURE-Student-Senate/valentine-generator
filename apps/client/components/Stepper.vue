<script lang="ts" setup>
import { STEPPER_TITLES } from '~/constants';

const props = defineProps<{ id: string }>();

const store = useValentineStore();

const { data } = storeToRefs(store);

const stepperStore = useStepperStore();

const { currentStep, isFirst } = storeToRefs(stepperStore);

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
  <Card class="w-[440px]" v-if="currentStep >= 0 && currentStep <= 2">
    <CardHeader>
      <CardTitle class="font-excali text-center">{{
        STEPPER_TITLES[currentStep]
      }}</CardTitle>
    </CardHeader>

    <CardContent class="space-y-2" v-if="currentStep === 0">
      <Textarea
        v-model="data.text"
        class="resize-none"
        placeholder="Введи текст..."
        maxlength="50"
        autofocus
      />
      <p class="text-sm text-muted-foreground">Максимум 50 символів</p>
    </CardContent>

    <CardContent class="space-y-2" v-if="currentStep === 1">
      <Input
        v-model="data.to"
        type="text"
        placeholder="Введи імʼя..."
        maxlength="25"
      />
      <p class="text-sm text-muted-foreground">Максимум 25 символів</p>
    </CardContent>

    <CardContent v-if="currentStep === 2">
      <Input
        v-model="data.from"
        type="text"
        placeholder="Введи імʼя..."
        maxlength="25"
      />
      <p class="text-sm text-muted-foreground">Максимум 25 символів</p>
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
    <div class="flex w-3/6 border rounded-md p-4 justify-between items-center">
      <p class="font-excali text-xl">Обери шаблон</p>
      <div class="inline-flex gap-3">
        <Button variant="ghost" @click="stepperStore.previousStep()"
          >Назад</Button
        >
        <Button variant="outline">
          <NuxtLink :to="`/${id}/preview`">Переглянути</NuxtLink>
        </Button>
        <Button @click="handleSubmit()" :disabled="isPending">{{
          buttonFallback
        }}</Button>
      </div>
    </div>
    <TemplateSelect />
  </div>
</template>
