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
        </div>
      </div>
      <div class="nav-right">
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
}

@media (max-width: 480px) {
  .header {
    padding: 0 var(--spacing-sm);
  }
}
</style> 