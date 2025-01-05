<template>
  <div class="app">
    <TheHeader />
    <main class="main">
      <NuxtPage />
    </main>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--bg-color);
}

.main {
  flex: 1;
  padding-top: 60px; /* 与顶栏高度相同 */
  width: 100%;
}
</style>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

watch(() => route.path, (path) => {
  if (typeof window !== 'undefined' && window._hmt) {
    window._hmt.push(['_trackPageview', path])
  }
}, { immediate: true })
</script>
