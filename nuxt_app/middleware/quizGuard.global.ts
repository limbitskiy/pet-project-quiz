import { useUserStore } from "~/store/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  const { currentQuestionIdx } = storeToRefs(userStore);

  if ((to.path === "/quiz" || to.path === "/finish") && currentQuestionIdx.value === null) {
    return navigateTo("/", { redirectCode: 301 });
  }
});
