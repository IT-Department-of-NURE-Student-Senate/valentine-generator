<script lang="ts" setup>
import Cloud1 from '~/assets/template-one/cloud-1.svg';
import Cloud2 from '~/assets/template-one/cloud-2.svg';
import Cloud3 from '~/assets/template-one/cloud-3.svg';
import Cloud4 from '~/assets/template-one/cloud-4.svg';
import Cloud5 from '~/assets/template-one/cloud-5.svg';
import SVGMan from '~/assets/template-one/man.svg';
import Star from '~/assets/template-one/star.svg';

defineProps<{ text: string; from: string; to: string }>();

const cardRef = ref(null);
const isVisible = ref(false);

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const stars = computed(() => {
  return Array.from({ length: 15 }, () => {
    const size = random(20, 50);
    return {
      top: `${random(4, 96 - (size * 100) / 720)}%`,
      left: `${random(4, 96 - (size * 100) / 1280)}%`,
      size: `${size}px`,
      rotation: `rotate(${random(0, 360)}deg)`,
      delay: random(0, 1),
    };
  });
});

const cloudDelays = computed(() => ({
  cloud1: random(0, 2),
  cloud2: random(0, 2),
  cloud3: random(0, 2),
  cloud4: random(0, 2),
  cloud5: random(0, 2),
}));

useIntersectionObserver(cardRef, ([{ isIntersecting }]) => {
  if (isIntersecting && !isVisible.value) {
    isVisible.value = true;
  }
});
</script>

<template>
  <ClientOnly>
    <main
      class="flex flex-col w-full h-dvh bg-[#fface1] items-center justify-center md:p-4"
    >
      <div
        ref="cardRef"
        :class="[
          'md:h-full md:w-full lg:h-[720px] lg:w-[1280px] h-full w-full bg-white border-2 border-black p-4 relative hover:shadow-xl transition',
          isVisible ? 'animate-card-appear' : 'opacity-0',
        ]"
      >
        <Cloud2
          :class="'hidden lg:block absolute bottom-[-2px] left-[-2px] h-[15%] z-10 animate-cloud-float'"
          :style="{ animationDelay: `${cloudDelays.cloud2}s` }"
        />
        <Cloud3
          :class="'hidden lg:block absolute bottom-[-2px] right-[30%] h-[20%] z-20 animate-cloud-float'"
          :style="{ animationDelay: `${cloudDelays.cloud3}s` }"
        />
        <Cloud4
          :class="'hidden lg:block absolute bottom-[5%] right-[-2px] h-[20%] z-20 animate-cloud-float'"
          :style="{ animationDelay: `${cloudDelays.cloud4}s` }"
        />
        <div
          class="overflow-hidden size-full border-black border-2 bg-[#fecdeb] relative bg-[length:30px_30px] bg-[linear-gradient(to_right,#fee0f1_1px,transparent_1px),linear-gradient(to_bottom,#fee0f1_1px,transparent_1px)]"
        >
          <Star
            v-for="(star, index) in stars"
            :key="index"
            class="absolute z-30 animate-star-twinkle"
            :style="{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              transform: star.rotation,
              animationDelay: `${star.delay}s`,
            }"
          />

          <p
            v-html="text.replaceAll('\n', '<br>')"
            class="absolute left-[2%] md:top-[2%] text-wrap text-[#e9110b] font-excali lg:w-[60%] z-[45] md:text-7xl text-4xl pointer-events-none select-none"
          />

          <p
            class="absolute font-excali left-[6%] bottom-[2%] text-wrap text-black font-semibold z-[45] text-3xl pointer-events-none select-none"
          >
            Від щирого серця<br />
            для {{ to }}<br />
            від {{ from }}
          </p>

          <p
            class="absolute w-full text-center bottom-[-10%] left-1/2 -translate-x-1/2 font-excali pointer-events-none lg:block hidden"
          >
            З любовʼю від IT-відділу Студентського сенату ХНУРЕ!
          </p>

          <SVGMan
            class="absolute lg:bottom-[20%] lg:right-[2%] lg:h-3/4 md:h-[30%] h-1/3 max-lg:bottom-[35%] max-lg:left-1/2 max-lg:-translate-x-1/2 z-20"
          />

          <Cloud1
            :class="'absolute lg:bottom-[23%] lg:right-[43%] lg:h-[25%] h-[15%] right-0 z-10 bottom-[-2px] animate-cloud-float'"
            :style="{ animationDelay: `${cloudDelays.cloud1}s` }"
          />
          <Cloud5
            :class="'absolute lg:top-[1%] md:right-[5%] max-md:left-[3%] lg:h-[35%] h-[16%] top-[-2px] z-10 animate-cloud-float'"
            :style="{ animationDelay: `${cloudDelays.cloud5}s` }"
          />
        </div>
      </div>
    </main>
  </ClientOnly>
</template>

<style>
@keyframes cardAppear {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes starTwinkle {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

@keyframes cloudFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.animate-card-appear {
  animation: cardAppear 0.8s ease-out forwards;
}

.animate-star-twinkle {
  animation: starTwinkle 3s ease-in-out infinite;
}

.animate-cloud-float {
  animation: cloudFloat 6s ease-in-out infinite;
}
</style>
