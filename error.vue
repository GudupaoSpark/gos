<template>
  <div class="home">
    <div class="hero">
      <div class="hero-content">
        <img src="/logo.png" alt="Logo" class="hero-logo">
        <h1>404</h1>
        <p>{{ $t('error.notFound') }}</p>
        <div class="actions">
          <NuxtLink :to="localePath('/')" class="btn btn-primary">
            {{ $t('error.backHome') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath()
defineProps({
  error: Object
})
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
  width: 120px;
  height: auto;
  margin-bottom: var(--spacing-lg);
}

.actions {
  margin-top: var(--spacing-lg);
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

h1 {
  font-size: 4rem;
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
    width: 100px;
  }

  h1 {
    font-size: 3rem;
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
    font-size: 2.5rem;
    margin: var(--spacing-md) 0;
  }
}
</style> 