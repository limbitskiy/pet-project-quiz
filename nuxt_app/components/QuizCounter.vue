<template>
  <div class="quiz-counter flex gap-4 justify-center items-center">
    <div v-for="circle in total" class="circle w-2 h-2 bg-white rounded-full transition-transform" :class="{ 'scale-150': current === circle }"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  total: number;
  current: number;
}>();
</script>
