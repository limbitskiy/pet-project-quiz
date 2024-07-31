<template>
  <div class="main-page grid place-items-center w-full bg-gradient-to-br from-[#99AB28] to-[#798B0C] relative">
    <div id="circle" class="bg-[#A1B13A] w-[120%] h-[300px] absolute z-10 rounded-[50%] rotate-[10deg]"></div>
    <div class="page-content absolute inset-0 z-20 grid place-items-center grid-2">
      <div class="hero flex flex-col items-center gap-4 flex-1 mt-8">
        <h1 class="text-4xl font-bold">Отлично!!</h1>
        <span class="w-4/5 text-center"
          >Вы ответили на {{ correctAnswers }} из {{ questions.length }} вопросов. Ваши ответы были сохранены в базу данных для дальнейшего использования без вашего согласия!<br /><br />
          Спасибо и удачи.</span
        >
      </div>
      <div class="question-end flex flex-col gap-6">
        <UButton label="Далее" size="xl" color="amber" :ui="{ rounded: 'rounded-full' }" @click="onRestart">
          <span class="w-[150px]">Заново?</span>
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
const { questions, answers } = storeToRefs(userStore);

const URL = process.env.SERVER_URL || "http://localhost:5005";

const { data: correctAnswers } = await useFetch(`${URL}/results`, {
  method: "POST",
  body: answers,
});

const onRestart = () => {
  navigateTo("/");
};
</script>
