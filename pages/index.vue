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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const localePath = useLocalePath()

definePageMeta({
  layout: 'default'
})

useHead({
  title: t('title'),
  meta: [
    {
      name: 'description',
      content: t('subtitle')
    }
  ]
})
</script>

<style scoped>

</style>

