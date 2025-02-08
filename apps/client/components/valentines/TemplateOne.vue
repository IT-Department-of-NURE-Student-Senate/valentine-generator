<script lang="ts" setup>
import Cloud1 from '~/assets/template-one/cloud-1.svg';
import Cloud2 from '~/assets/template-one/cloud-2.svg';
import Cloud3 from '~/assets/template-one/cloud-3.svg';
import Cloud4 from '~/assets/template-one/cloud-4.svg';
import Cloud5 from '~/assets/template-one/cloud-5.svg';
import SVGMan from '~/assets/template-one/man.svg';
import Star from '~/assets/template-one/star.svg';

defineProps<{ text: string; from: string; to: string }>();

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const stars = Array.from({ length: 15 }, () => {
  const size = random(20, 50);

  return {
    top: `${random(4, 96 - (size * 100) / 720)}%`,
    left: `${random(4, 96 - (size * 100) / 1280)}%`,
    size: `${size}px`,
    rotation: `rotate(${random(0, 360)}deg)`,
  };
});
</script>

<template>
  <main
    class="flex flex-col w-full h-dvh bg-[#fface1] items-center justify-center mdp-4"
  >
    <div
      class="md:h-full md:w-full lg:h-[720px] lg:w-[1280px] h-full w-full bg-white border-2 border-black p-4 relative"
    >
      <Cloud2
        class="hidden lg:block absolute bottom-[-2px] left-[-2px] h-[15%] z-10"
      />
      <Cloud3
        class="hidden lg:block absolute bottom-[-2px] right-[30%] h-[20%] z-20"
      />
      <Cloud4
        class="hidden lg:block absolute bottom-[5%] right-[-2px] h-[20%] z-20"
      />
      <div
        class="overflow-hidden size-full border-black border-2 bg-[#fecdeb] relative bg-[length:30px_30px] bg-[linear-gradient(to_right,#fee0f1_1px,transparent_1px),linear-gradient(to_bottom,#fee0f1_1px,transparent_1px)]"
      >
        <Star
          v-for="(star, index) in stars"
          :key="index"
          class="absolute z-30"
          :style="{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            transform: star.rotation,
          }"
        />
        <p
          v-html="text.replaceAll('\n', '<br>')"
          class="absolute left-[2%] md:top-[2%] text-wrap text-[#e9110b] font-excali lg:w-[60%] z-50 md:text-7xl text-4xl pointer-events-none text-ellipsis overflow-hidden whitespace-nowrap"
        />
        <p
          class="absolute font-excali left-[6%] bottom-[2%] text-wrap text-black font-semibold z-50 text-3xl pointer-events-none"
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
          class="absolute md:bottom-[20%] md:right-[2%] lg:h-3/4 md:h-[30%] max-lg:left-1/2 max-lg:-translate-x-1/2 max-md:bottom-[30%] max-md:w-full z-20"
        />
        <Cloud1
          class="absolute lg:bottom-[23%] lg:right-[43%] lg:h-[25%] h-[15%] right-0 z-10 bottom-0"
        />
        <Cloud5
          class="hidden lg:block absolute top-[1%] right-[5%] h-[35%] z-10"
        />
      </div>
    </div>
  </main>
</template>
