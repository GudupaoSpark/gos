<template>
  <header class="header">
    <nav class="nav">
      <div class="nav-left">
        <NuxtLink to="/" class="logo">
          <img src="/logo.png" alt="Logo" height="32" width="32">
          <span class="logo-text">{{ $t('title') }}</span>
        </NuxtLink>
        <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen">
          <span class="menu-icon"></span>
        </button>
        <div class="nav-links" :class="{ 'nav-links-open': isMenuOpen }">
          <NuxtLink :to="localePath('/')" class="nav-item">{{ $t('nav.home') }}</NuxtLink>
          <NuxtLink :to="localePath('/projects')" class="nav-item">{{ $t('nav.projects') }}</NuxtLink>
          <NuxtLink :to="localePath('/trending')" class="nav-item">{{ $t('nav.trending') }}</NuxtLink>
          <NuxtLink :to="localePath('/about')" class="nav-item">{{ $t('nav.about') }}</NuxtLink>
          <div class="mobile-nav-right">
            <div class="search-box mobile-only">
              <input 
                v-model="searchQuery" 
                type="text" 
                :placeholder="$t('projects.searchPlaceholder')"
                class="search-input"
                @keyup.enter="handleSearch"
              >
              <svg class="search-icon" viewBox="0 0 24 24">
                <path d="M10.5 3a7.5 7.5 0 015.645 12.438l4.709 4.708a.75.75 0 01-1.06 1.061l-4.708-4.709A7.5 7.5 0 1110.5 3zm0 1.5a6 6 0 100 12 6 6 0 000-12z"/>
              </svg>
              <button 
                v-if="searchQuery" 
                class="clear-search" 
                @click="clearSearch"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M6.22 6.22a.75.75 0 011.06 0L12 10.94l4.72-4.72a.75.75 0 111.06 1.06L13.06 12l4.72 4.72a.75.75 0 11-1.06 1.06L12 13.06l-4.72 4.72a.75.75 0 01-1.06-1.06L10.94 12 6.22 7.28a.75.75 0 010-1.06z"/>
                </svg>
              </button>
            </div>
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
        <div class="search-box">
          <input 
            v-model="searchQuery" 
            type="text" 
            :placeholder="$t('projects.searchPlaceholder')"
            class="search-input"
            @keyup.enter="handleSearch"
          >
          <svg class="search-icon" viewBox="0 0 24 24">
            <path d="M10.5 3a7.5 7.5 0 015.645 12.438l4.709 4.708a.75.75 0 01-1.06 1.061l-4.708-4.709A7.5 7.5 0 1110.5 3zm0 1.5a6 6 0 100 12 6 6 0 000-12z"/>
          </svg>
          <button 
            v-if="searchQuery" 
            class="clear-search" 
            @click="clearSearch"
          >
            <svg viewBox="0 0 24 24">
              <path d="M6.22 6.22a.75.75 0 011.06 0L12 10.94l4.72-4.72a.75.75 0 111.06 1.06L13.06 12l4.72 4.72a.75.75 0 11-1.06 1.06L12 13.06l-4.72 4.72a.75.75 0 01-1.06-1.06L10.94 12 6.22 7.28a.75.75 0 010-1.06z"/>
            </svg>
          </button>
        </div>
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
const router = useRouter()
const isMenuOpen = ref(false)
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(localePath('/projects') + '?search=' + encodeURIComponent(searchQuery.value.trim()))
    isMenuOpen.value = false
  }
}

const clearSearch = () => {
  searchQuery.value = ''
}
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
  min-width: fit-content;
  max-width: 300px;
  width: auto;
}

.logo img {
  height: 32px;
  width: 32px;
  min-width: 32px;
  flex-shrink: 0;
}

.logo-text {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  min-width: 0;
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

@media (max-width: 1100px) {
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

  .search-box {
    width: 100%;
    margin: 0 0 var(--spacing-md);
  }

  .nav-links .search-box {
    order: -1;
  }
}

@media (min-width: 1100px) {
  .mobile-nav-right {
    display: none;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 0 var(--spacing-sm);
  }

  .logo {
    padding-right: var(--spacing-sm);
    border-right: none;
    min-width: unset;
    width: auto;
  }

  .logo-text {
    display: none !important;
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

.search-box {
  position: relative;
  min-width: 200px;
  max-width: 300px;
  flex: 1;
  margin: 0 var(--spacing-md);
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  height: 36px;
  padding: 0 var(--spacing-lg) 0 2.5rem;
  font-size: 0.875rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  background: var(--bg-light);
  color: var(--text-color);
  transition: var(--transition);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  background: var(--bg-color);
  box-shadow: 0 0 0 2px var(--primary-color-light);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  fill: var(--text-light);
}

.clear-search {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-light);
}

.clear-search svg {
  width: 1rem;
  height: 1rem;
  fill: currentColor;
}

.clear-search:hover {
  color: var(--text-color);
}

@media (max-width: 1100px) {
  .search-box {
    width: 100%;
    margin: var(--spacing-sm) 0;
  }
}

.mobile-only {
  display: none;
}

@media (max-width: 1100px) {
  .mobile-only {
    display: flex !important;
  }

  .desktop-only {
    display: none !important;
  }

  .search-box {
    min-width: unset;
    max-width: unset;
    width: 100%;
    margin: var(--spacing-sm) 0;
  }

  .nav-links .search-box {
    order: -1;
  }

  .mobile-nav-right .search-box {
    margin: 0 0 var(--spacing-md);
  }
}

@media (max-width: 1024px) {
  .search-box {
    min-width: 160px;
  }
}

.logo-text {
  display: block;
}

@media (max-width: 1000px) {
  .logo-text {
    display: block;
  }
  
  .logo {
    width: auto;
    min-width: auto;
    padding-right: var(--spacing-md);
  }
}

@media (min-width: 769px) and (max-width: 1100px) {
  .nav {
    justify-content: space-between;
  }
  
  .nav-left {
    flex: 1;
    display: flex;
    align-items: center;
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

  .menu-toggle {
    display: block;
    margin-left: auto;
  }

  .logo {
    margin-right: var(--spacing-md);
  }

  .logo-text {
    display: block;
  }
}
</style> 