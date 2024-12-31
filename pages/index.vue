<template>
  <div class="home">
    <div class="hero">
      <div class="hero-content">
        <img src="/logo.png" alt="Gudupao Open Source" class="hero-logo">
        <h1>{{ $t('title') }}</h1>
        <p>{{ $t('subtitle') }}</p>
        <div class="actions">
          <NuxtLink :to="localePath('/projects')" class="btn btn-primary">
            {{ $t('nav.projects') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/about')" class="btn">
            {{ $t('nav.about') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath()
</script>

<style scoped>
.home {
  min-height: calc(100vh - 60px);
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  overflow-x: hidden;
}

.hero {
  height: 100%;
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-gradient);
  padding: var(--spacing-xl);
}

.hero-content {
  text-align: center;
  max-width: 800px;
  width: 100%;
  background: var(--bg-color);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  animation: fadeIn 0.6s ease-out;
}

.hero-logo {
  width: 200px;
  height: auto;
  max-width: 100%;
}

.actions {
  margin-top: var(--spacing-lg);
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

h1 {
  font-size: 2.5rem;
  margin: var(--spacing-lg) 0 var(--spacing-md);
  color: var(--primary-color);
}

p {
  font-size: 1.2rem;
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--secondary-color);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero {
    padding: var(--spacing-md);
  }

  .hero-content {
    padding: var(--spacing-lg);
  }

  .hero-logo {
    width: 150px;
  }

  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: var(--spacing-sm);
  }

  .hero-content {
    padding: var(--spacing-md);
  }

  .actions {
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .btn {
    width: 100%;
  }

  h1 {
    font-size: 1.75rem;
    margin: var(--spacing-md) 0;
  }
}
</style>
