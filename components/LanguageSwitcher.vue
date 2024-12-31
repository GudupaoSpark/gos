<template>
  <div class="language-switcher">
    <select v-model="currentLocale" @change="switchLanguage" class="btn btn-sm">
      <option value="zh">中文</option>
      <option value="en">English</option>
    </select>
  </div>
</template>

<script setup>
const { locale } = useI18n()
const router = useRouter()

const currentLocale = ref(locale.value)

const switchLanguage = () => {
  const switchPath = useSwitchLocalePath()
  const targetPath = switchPath(currentLocale.value)
  if (targetPath) {
    router.push(targetPath)
  }
}
</script>

<style scoped>
.language-switcher {
  display: inline-block;
  margin: var(--spacing-sm);
}

.language-switcher select {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-md);
  border: 1px solid var(--primary-color);
  background-color: var(--bg-color);
  color: var(--text-color);
  cursor: pointer;
}

.language-switcher select:focus {
  outline: none;
  border-color: var(--secondary-color);
}
</style> 