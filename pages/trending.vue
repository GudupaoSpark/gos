<template>
  <div class="trending-page">
    <div class="trending-header">
      <h1>{{ $t('trending.title') }}</h1>
      <p>{{ $t('trending.subtitle') }}</p>
    </div>

    <div class="search-and-filter">
      <div class="search-box">
        <svg class="search-icon" viewBox="0 0 24 24">
          <path d="M10.5 3a7.5 7.5 0 015.645 12.438l4.709 4.708a.75.75 0 01-1.06 1.061l-4.708-4.709A7.5 7.5 0 1110.5 3zm0 1.5a6 6 0 100 12 6 6 0 000-12z"/>
        </svg>
        <input 
          v-model="searchQuery" 
          type="text" 
          :placeholder="$t('projects.searchPlaceholder')"
          class="search-input"
        >
        <button 
          v-if="searchQuery" 
          class="clear-search" 
          @click="searchQuery = ''"
        >
          <svg viewBox="0 0 24 24">
            <path d="M6.22 6.22a.75.75 0 011.06 0L12 10.94l4.72-4.72a.75.75 0 111.06 1.06L13.06 12l4.72 4.72a.75.75 0 11-1.06 1.06L12 13.06l-4.72 4.72a.75.75 0 01-1.06-1.06L10.94 12 6.22 7.28a.75.75 0 010-1.06z"/>
          </svg>
        </button>
      </div>

      <div class="filter-section">
        <div class="filter-tags">
          <button 
            class="filter-tag"
            :class="{ active: selectedTags.length === 0 }"
            @click="clearTags"
          >
            {{ $t('projects.all') }}
          </button>
          <button 
            v-for="tag in availableTags" 
            :key="tag"
            class="filter-tag"
            :class="{ active: selectedTags.includes(tag) }"
            @click="toggleTag(tag)"
          >
            <span class="language-color" :style="{ backgroundColor: languageColors[tag] }"></span>
            {{ tag }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
    </div>

    <div v-else class="trending-grid">
      <div 
        v-for="repo in filteredRepos" 
        :key="repo.full_name" 
        class="repo-card"
      >
        <div class="repo-content">
          <div class="repo-header">
            <a :href="repo.html_url" target="_blank" class="repo-name">
              <span class="owner">{{ repo.owner.login }}</span>
              <span class="separator">/</span>
              <span class="name">{{ repo.name }}</span>
            </a>
          </div>

          <p class="repo-description">{{ repo.description }}</p>

          <div class="project-tags">
            <span v-if="repo.language" class="tag">
              <span class="language-color" :style="{ backgroundColor: languageColors[repo.language] }"></span>
              {{ repo.language }}
            </span>
          </div>
        </div>

        <div class="repo-stats">
          <div class="stats-left">
            <span class="stat">
              <svg class="icon" viewBox="0 0 16 16">
                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/>
              </svg>
              {{ repo.stargazers_count.toLocaleString() }}
            </span>
            <span class="stat">
              <svg class="icon" viewBox="0 0 16 16">
                <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/>
              </svg>
              {{ repo.forks_count.toLocaleString() }}
            </span>
          </div>
          <a :href="repo.html_url" target="_blank" rel="noopener" class="btn btn-primary">
            <svg class="icon" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Octokit } from '@octokit/rest'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const octokit = new Octokit()

useHead({
  title: `${t('trending.title')} - ${t('title')}`,
  meta: [
    {
      name: 'description',
      content: t('trending.subtitle')
    }
  ]
})

const trendingRepos = ref([])
const loading = ref(true)
const selectedTags = ref([])
const searchQuery = ref('')

// 可用的语言标签
const availableTags = computed(() => {
  const tags = new Set()
  trendingRepos.value.forEach(repo => {
    if (repo.language) {
      tags.add(repo.language)
    }
  })
  return Array.from(tags).sort()
})

// 筛选后的仓库
const filteredRepos = computed(() => {
  let result = trendingRepos.value

  // 应用标签筛选
  if (selectedTags.value.length > 0) {
    result = result.filter(repo => 
      repo.language && selectedTags.value.includes(repo.language)
    )
  }

  // 应用搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(repo => 
      repo.name.toLowerCase().includes(query) ||
      repo.description?.toLowerCase().includes(query) ||
      repo.owner.login.toLowerCase().includes(query)
    )
  }

  return result
})

// 切换标签
const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index === -1) {
    selectedTags.value = [tag] // 只允许选择一个标签
  } else {
    selectedTags.value = []
  }
}

// 清除标签
const clearTags = () => {
  selectedTags.value = []
}

// GitHub 语言颜色映射
const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Go: '#00ADD8',
  Vue: '#41b883',
  React: '#61dafb',
}

// 获取热门仓库
const fetchTrendingRepos = async () => {
  loading.value = true
  try {
    const { data } = await octokit.search.repos({
      q: 'stars:>1000',
      sort: 'stars',
      order: 'desc',
      per_page: 50
    })

    trendingRepos.value = data.items
  } catch (error) {
    console.error('Error fetching trending repos:', error)
  } finally {
    loading.value = false
  }
}

// 初始加载
onMounted(() => {
  fetchTrendingRepos()
})
</script>

<style scoped>
.trending-page {
  padding: calc(var(--spacing-xl) + 60px) var(--spacing-xl) var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
}

.trending-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.trending-header h1 {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
}

.trending-header p {
  font-size: 1.2rem;
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
}

.search-and-filter {
  margin-bottom: var(--spacing-xl);
}

.search-box {
  position: relative;
  max-width: 600px;
  margin: 0 auto var(--spacing-lg);
}

.search-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-lg) var(--spacing-sm) 2.5rem;
  font-size: 1rem;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-full);
  background: var(--bg-color);
  color: var(--text-color);
  transition: var(--transition);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-color-light);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
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
  width: 1.25rem;
  height: 1.25rem;
  fill: currentColor;
}

.clear-search:hover {
  color: var(--text-color);
}

.filter-section {
  margin-bottom: var(--spacing-xl);
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  justify-content: center;
}

.filter-tag {
  background: var(--bg-light);
  border: 1px solid var(--border-color);
  color: var(--text-light);
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  cursor: pointer;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.filter-tag:hover {
  background: var(--bg-hover);
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.filter-tag.active {
  background: var(--primary-color);
  color: var(--bg-color);
  border-color: var(--primary-color);
}

.results-info {
  text-align: center;
  color: var(--text-light);
  margin-bottom: var(--spacing-lg);
  font-size: 0.875rem;
}

.trending-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.repo-card {
  background: var(--bg-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.repo-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.repo-content {
  padding: var(--spacing-lg);
  flex: 1;
}

.repo-header {
  margin-bottom: var(--spacing-md);
}

.repo-name {
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: var(--spacing-sm);
  text-decoration: none;
  display: inline-block;
}

.repo-name:hover .name {
  text-decoration: underline;
}

.owner {
  color: var(--text-light);
}

.separator {
  margin: 0 var(--spacing-xs);
  color: var(--text-light);
}

.name {
  color: var(--primary-color);
}

.repo-description {
  color: var(--text-light);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.tag {
  background: var(--bg-light);
  color: var(--primary-color);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.language-color {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.repo-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--bg-light);
  border-top: 1px solid var(--border-color);
}

.stats-left {
  display: flex;
  gap: var(--spacing-md);
}

.stat {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-light);
  font-size: 0.875rem;
}

.icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: 0.875rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  text-decoration: none;
  transition: var(--transition);
}

.btn-primary .icon {
  fill: white;
}

.btn-primary:hover {
  opacity: 0.9;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .trending-page {
    padding: calc(var(--spacing-xl) + 60px) var(--spacing-md) var(--spacing-md);
  }

  .trending-header h1 {
    font-size: 2rem;
  }

  .trending-header p {
    font-size: 1rem;
  }

  .search-box {
    margin: 0 var(--spacing-md) var(--spacing-lg);
  }

  .repo-stats {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .stats-left {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-primary {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .trending-page {
    padding: calc(var(--spacing-lg) + 60px) var(--spacing-sm) var(--spacing-sm);
  }

  .search-box {
    margin: 0 var(--spacing-sm) var(--spacing-lg);
  }
}
</style> 