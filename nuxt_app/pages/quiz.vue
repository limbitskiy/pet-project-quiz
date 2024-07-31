<template>
  <div class="main-page grid place-items-center w-full bg-gradient-to-br from-[#B82F71] to-[#822853] relative">
    <div id="circle" class="bg-[#BC4980] w-[120%] h-[300px] absolute z-10 rounded-[50%] rotate-[10deg]"></div>
    <div class="page-content absolute inset-0 z-20 grid place-items-center grid-2">
      <div class="hero flex flex-col items-center gap-4 flex-1 mt-8 min-w-[80%]">
        <h1 class="text-3xl font-bold">Вопрос {{ currentQuestionIdx! + 1 }}:</h1>
        <span class="w-4/5 text-center text-gray-200 font-semibold">{{ currentQuestion?.question }}</span>
        <div class="variants flex flex-col gap-2 mt-2 max-w-[75%]">
          <URadio
            v-for="(answer, index) of currentQuestion?.answers"
            :key="answer"
            color="indigo"
            v-model="selected"
            v-bind="{ label: answer, value: index }"
            class="flex items-center"
          >
            <template #label="option">
              <span class="text-gray-100 text-lg mb-2 font-normal"> {{ option.label }} </span>
            </template>
          </URadio>
        </div>
      </div>
      <div class="question-end flex flex-col gap-6">
        <QuizCounter :total="questions.length" :current="currentQuestionIdx! + 1" />
        <UButton label="Далее" size="xl" color="indigo" :ui="{ rounded: 'rounded-full' }" :disabled="selected == null" @click="onNextQuestion">
          <span class="w-[150px]">Далее</span>
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/store/user";

const userStore = useUserStore();

const { currentQuestionIdx, questions } = storeToRefs(userStore);
const { setCurrentQuestionIdx, addAnswer } = userStore;

const selected = ref(null);

const currentQuestion = computed(() => questions.value[currentQuestionIdx.value!]);

const onNextQuestion = () => {
  addAnswer({ id: currentQuestion.value.id, answer: +selected.value });

  const nextQuestion = questions.value[currentQuestionIdx.value! + 1];

  if (nextQuestion) {
    selected.value = null;
    setCurrentQuestionIdx(currentQuestionIdx.value! + 1);
  } else {
    navigateTo("/finish");
  }
};
</script>
