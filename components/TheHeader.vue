<template>
  <header class="header">
    <nav class="nav">
      <div class="nav-left">
        <NuxtLink to="/" class="logo">
          <img src="/logo.png" alt="Logo" height="32">
          <span class="logo-text">{{ $t('title') }}</span>
        </NuxtLink>
        <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen">
          <span class="menu-icon"></span>
        </button>
        <div class="nav-links" :class="{ 'nav-links-open': isMenuOpen }">
          <NuxtLink :to="localePath('/')" class="nav-item">{{ $t('nav.home') }}</NuxtLink>
          <NuxtLink :to="localePath('/projects')" class="nav-item">{{ $t('nav.projects') }}</NuxtLink>
          <NuxtLink :to="localePath('/about')" class="nav-item">{{ $t('nav.about') }}</NuxtLink>
          <div class="mobile-nav-right">
            <a href="https://github.com/GudupaoSpark/gos" target="_blank" class="nav-item github-link" title="GitHub">
              <svg height="24" width="24" viewBox="0 0 16 16" class="github-icon">
                <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              <span class="github-text">GitHub</span>
            </a>
            <div class="mobile-language-switcher">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
      <div class="nav-right desktop-only">
        <a href="https://github.com/GudupaoSpark/gos" target="_blank" class="github-link" title="GitHub">
          <svg height="24" width="24" viewBox="0 0 16 16" class="github-icon">
            <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
        </a>
        <LanguageSwitcher />
      </div>
    </nav>
  </header>
</template>

<script setup>
const localePath = useLocalePath()
const isMenuOpen = ref(false)
</script>

<style scoped>
.header {
  background-color: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-xl);
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  text-decoration: none;
  color: var(--text-color);
  font-weight: 600;
  padding-right: var(--spacing-xl);
  border-right: 1px solid var(--border-color);
}

.logo img {
  height: 32px;
  width: auto;
}

.nav-item {
  color: var(--text-color);
  text-decoration: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  transition: var(--transition);
}

.nav-item:hover {
  background-color: var(--bg-light);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-sm);
}

.menu-icon {
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--text-color);
  position: relative;
  transition: var(--transition);
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: var(--text-color);
  transition: var(--transition);
}

.menu-icon::before {
  top: -6px;
}

.menu-icon::after {
  bottom: -6px;
}

@media (max-width: 768px) {
  .header {
    padding: 0 var(--spacing-md);
  }

  .menu-toggle {
    display: block;
    order: 1;
  }

  .logo {
    padding-right: var(--spacing-md);
    border-right: none;
  }

  .logo-text {
    display: none;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background-color: var(--bg-color);
    padding: var(--spacing-md);
    border-bottom: 1px solid var(--border-color);
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .nav-links-open {
    display: flex;
  }

  .nav-item {
    width: 100%;
    text-align: center;
  }

  .desktop-only {
    display: none;
  }

  .mobile-nav-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-md);
    padding-top: var(--spacing-md);
    border-top: 1px solid var(--border-color);
    width: 100%;
  }

  .github-link {
    width: 100%;
    justify-content: center;
  }

  .github-text {
    margin-left: var(--spacing-sm);
  }

  .mobile-language-switcher {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

@media (min-width: 769px) {
  .mobile-nav-right {
    display: none;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 0 var(--spacing-sm);
  }
}

.github-link {
  display: flex;
  align-items: center;
  color: var(--text-color);
  transition: var(--transition);
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
}

.github-link:hover {
  background-color: var(--bg-light);
}

.github-icon {
  display: block;
}
</style> 