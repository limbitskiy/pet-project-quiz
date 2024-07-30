<template>
  <div class="main-page grid place-items-center w-full bg-gradient-to-br from-[#141733] to-[#10153F] relative">
    <div id="circle" class="bg-[#202550] w-[120%] h-[300px] absolute z-10 rounded-[50%] rotate-[10deg]"></div>
    <div class="page-content absolute inset-0 z-20 grid place-items-center grid-2">
      <NoConnection v-if="!questions" />
      <div v-else class="hero flex flex-col items-center gap-4 flex-1 mt-8">
        <h1 class="text-4xl font-bold">Приветствие!</h1>
        <span id="index-text" class="w-4/5 text-center text-gray-300"
          >Вам предлагается пройти небольшой опросник на {{ questions.length }} вопроса. Если вы согласны - жмите “Далее”.</span
        >
      </div>
      <UButton label="Далее" size="xl" :ui="{ rounded: 'rounded-full' }" @click="onQuizStart">
        <span class="w-[30vw]">Далее</span>
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/store/user";
import useGsap from "~/plugins/gsap.ts";

useGsap();
const userStore = useUserStore();
const { setQuestions, setCurrentQuestionIdx } = userStore;

const URL = process.env.SERVER_URL || "http://localhost:5005";

const { data: questions } = await useFetch(URL);

setQuestions(questions);

const onQuizStart = () => {
  setCurrentQuestionIdx(0);
  navigateTo("/quiz");
};
</script>
