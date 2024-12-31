<template>
  <div class="layout">
    <header class="header">
      <nav class="nav">
        <NuxtLink to="/" class="logo">
          <img src="/logo.png" alt="Logo" />
        </NuxtLink>
        
        <div class="nav-right">
          <NuxtLink 
            v-for="item in menuItems" 
            :key="item.path"
            :to="item.path"
            class="nav-link"
            active-class="active"
          >
            {{ $t(item.title) }}
          </NuxtLink>
          
          <button class="theme-toggle" @click="toggleTheme">
            <svg v-if="isDark" class="icon" viewBox="0 0 24 24">
              <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/>
            </svg>
            <svg v-else class="icon" viewBox="0 0 24 24">
              <path d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z"/>
            </svg>
          </button>
        </div>
      </nav>
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <p>{{ $t('footer.copyright') }}</p>
    </footer>
  </div>
</template>

<script setup>
const menuItems = [
  { path: '/', title: 'nav.home' },
  { path: '/projects', title: 'nav.projects' },
  { path: '/about', title: 'nav.about' }
]

const isDark = useDark()
const toggleTheme = useToggle(isDark)
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  z-index: 100;
}

.nav {
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 32px;
  width: auto;
}

.nav-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.nav-link {
  color: var(--text-light);
  text-decoration: none;
  font-size: 0.875rem;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  transition: var(--transition);
}

.nav-link:hover {
  color: var(--text-color);
  background: var(--bg-hover);
}

.nav-link.active {
  color: var(--primary-color);
  background: var(--bg-hover);
}

.theme-toggle {
  padding: var(--spacing-xs);
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: var(--transition);
}

.theme-toggle:hover {
  color: var(--text-color);
  background: var(--bg-hover);
}

.theme-toggle .icon {
  width: 1.25rem;
  height: 1.25rem;
  fill: currentColor;
}

.main {
  flex: 1;
}

.footer {
  padding: var(--spacing-lg);
  text-align: center;
  color: var(--text-light);
  border-top: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .nav {
    padding: 0 var(--spacing-md);
  }

  .nav-link {
    display: none;
  }

  .nav-center {
    justify-content: flex-end;
  }
}
</style> 