<template>
  <div class="language-switcher">
    <div class="switch-container">
      <div class="switch-background"></div>
      <div class="switch-slider" :class="{ 'is-en': currentLocale === 'en' }"></div>
      <button 
        class="language-button" 
        @click="switchToLanguage('zh')"
        :class="{ active: currentLocale === 'zh' }"
        title="切换到中文"
      >
        <svg class="language-icon" viewBox="0 0 512 512">
          <rect width="512" height="512" fill="#DE2910"/>
          <path d="M140 128l12 36h36l-30 22 12 36-30-22-30 22 12-36-30-22h36z" fill="#FFDE00"/>
          <path d="M275 52l-6 18-18-6 15 12-6 18 15-12 15 12-6-18 15-12-18-6z" fill="#FFDE00"/>
          <path d="M316 107l-15 12-15-12 6 18-15 12h18l6 18 6-18h18l-15-12z" fill="#FFDE00"/>
          <path d="M316 169l-15 12-15-12 6 18-15 12h18l6 18 6-18h18l-15-12z" fill="#FFDE00"/>
          <path d="M275 225l-6 18-18-6 15 12-6 18 15-12 15 12-6-18 15-12-18-6z" fill="#FFDE00"/>
        </svg>
      </button>
      <button 
        class="language-button" 
        @click="switchToLanguage('en')"
        :class="{ active: currentLocale === 'en' }"
        title="Switch to English"
      >
        <svg class="language-icon" viewBox="0 0 512 512">
          <rect width="512" height="512" fill="#012169"/>
          <path d="M512 0v64L322 256l190 187v69h-67L254 324 68 512H0v-68l186-187L0 74V0h62l192 188L440 0z" fill="#FFF"/>
          <path d="M184 324l11 34L42 512H0v-3l184-185zm124-12l54 8 150 147v45L308 312zM512 0L320 196l-4-44L466 0h46zM0 1l193 189-59-8L0 49V1z" fill="#C8102E"/>
          <path d="M176 0v512h160V0H176zM0 176v160h512V176H0z" fill="#FFF"/>
          <path d="M0 208v96h512v-96H0zM208 0v512h96V0h-96z" fill="#C8102E"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n()
const router = useRouter()
const currentLocale = ref(locale.value)

const switchToLanguage = (lang) => {
  const switchPath = useSwitchLocalePath()
  const targetPath = switchPath(lang)
  if (targetPath) {
    currentLocale.value = lang
    router.push(targetPath)
  }
}
</script>

<style scoped>
.language-switcher {
  display: inline-flex;
  align-items: center;
}

.switch-container {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--bg-light);
  border-radius: 30px;
  padding: 4px;
  gap: 4px;
}

.switch-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 30px;
  background: var(--bg-light);
  z-index: 0;
}

.switch-slider {
  position: absolute;
  width: 32px;
  height: 32px;
  background: var(--bg-color);
  border-radius: 50%;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(0px);
}

.switch-slider.is-en {
  transform: translateX(36px);
}

.language-button {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.language-button:hover {
  transform: scale(1.1);
}

.language-button:active {
  transform: scale(0.95);
}

.language-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

@media (max-width: 768px) {
  .switch-container {
    padding: 6px;
  }

  .switch-slider {
    width: 36px;
    height: 36px;
  }

  .switch-slider.is-en {
    transform: translateX(48px);
  }

  .language-icon {
    width: 28px;
    height: 28px;
  }
}
</style> 