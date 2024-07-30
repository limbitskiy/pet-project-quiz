export const useUserStore = defineStore("user", () => {
  const state = ref({
    loading: false,
    currentQuestionIdx: null,
    questions: [],
    answers: [],
  });

  const currentQuestionIdx = computed(() => state.value.currentQuestionIdx);

  const questions = computed(() => state.value.questions);

  const answers = computed(() => state.value.answers);

  const setCurrentQuestionIdx = (val) => {
    state.value.currentQuestionIdx = val;
  };

  const setQuestions = (newQuestions) => {
    state.value.questions = newQuestions;
  };

  const addAnswer = (answer) => {
    state.value.answers.push(answer);
  };

  return { currentQuestionIdx, questions, answers, setCurrentQuestionIdx, setQuestions, addAnswer };
});
