<template>
  <div class="projects-page">
    <div class="projects-header">
      <h1>{{ $t('projects.title') }}</h1>
      <p>{{ $t('projects.subtitle') }}</p>
    </div>
    
    <div class="search-and-filter">
      <div class="search-box">
        <svg class="search-icon" viewBox="0 0 24 24">
          <path d="M10.5 3a7.5 7.5 0 015.645 12.438l4.709 4.708a.75.75 0 01-1.06 1.061l-4.708-4.709A7.5 7.5 0 1110.5 3zm0 1.5a6 6 0 100 12 6 6 0 000-12z"/>
        </svg>
        <input 
          v-model="searchQuery" 
          type="text" 
          :placeholder="$t('projects.searchPlaceholder') || '搜索项目名称或描述...'"
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
            {{ tag }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="searchQuery || selectedTags.length > 0" class="results-info">
      找到 {{ filteredProjects.length }} 个项目
    </div>

    <div class="projects-grid">
      <div 
        v-for="project in filteredProjects" 
        :key="project.id" 
        class="project-card"
      >
        <div class="project-content">
          <h3>{{ project.name }}</h3>
          <p>{{ project.description }}</p>
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        <div class="project-footer">
          <div class="project-stats">
            <span class="stat">
              <svg class="icon" viewBox="0 0 16 16">
                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/>
              </svg>
              {{ project.stars }}
            </span>
            <span class="stat">
              <svg class="icon" viewBox="0 0 16 16">
                <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/>
              </svg>
              {{ project.forks }}
            </span>
          </div>
          <a :href="project.github" target="_blank" rel="noopener" class="btn btn-primary">
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
import projectsData from '@/data/projects.json'
import { Octokit } from '@octokit/rest'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: `${t('projects.title')} - ${t('title')}`,
  meta: [
    {
      name: 'description',
      content: t('projects.subtitle')
    }
  ]
})

const projects = ref([])
const selectedTags = ref([])
const searchQuery = ref('')
const octokit = new Octokit()

const availableTags = computed(() => {
  const tags = new Set()
  projects.value.forEach(project => {
    project.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
})

const filteredProjects = computed(() => {
  let result = projects.value

  // 应用标签筛选
  if (selectedTags.value.length > 0) {
    result = result.filter(project => 
      selectedTags.value.every(tag => project.tags.includes(tag))
    )
  }

  // 应用搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(project => 
      project.name.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query)
    )
  }

  return result
})

function toggleTag(tag) {
  const index = selectedTags.value.indexOf(tag)
  if (index === -1) {
    selectedTags.value.push(tag)
  } else {
    selectedTags.value.splice(index, 1)
  }
}

function clearTags() {
  selectedTags.value = []
}

async function fetchGitHubStats(projects) {
  const updatedProjects = await Promise.all(
    projects.map(async (project) => {
      try {
        const [, , , owner, repo] = project.github.split('/')
        const { data } = await octokit.repos.get({
          owner,
          repo,
        })
        
        return {
          ...project,
          stars: data.stargazers_count,
          forks: data.forks_count,
        }
      } catch (error) {
        console.error(`Error fetching stats for ${project.name}:`, error)
        return project
      }
    })
  )
  return updatedProjects
}

onMounted(async () => {
  const updatedProjects = await fetchGitHubStats(projectsData.projects)
  projects.value = updatedProjects
})
</script>

<style scoped>
.projects-page {
  padding: calc(var(--spacing-xl) + 60px) var(--spacing-xl) var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
}

.projects-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.projects-header h1 {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
}

.projects-header p {
  font-size: 1.2rem;
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.project-card {
  background: var(--bg-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.project-content {
  padding: var(--spacing-lg);
  flex: 1;
}

.project-content h3 {
  font-size: 1.5rem;
  color: var(--text-color);
  margin-bottom: var(--spacing-sm);
}

.project-content p {
  color: var(--text-light);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.tag {
  background: var(--bg-light);
  color: var(--primary-color);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
}

.project-footer {
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--bg-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--border-color);
}

.project-stats {
  display: flex;
  gap: var(--spacing-md);
}

.stat {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-light);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .projects-page {
    padding: calc(var(--spacing-xl) + 60px) var(--spacing-md) var(--spacing-md);
  }

  .projects-header h1 {
    font-size: 2rem;
  }

  .projects-header p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .projects-page {
    padding: calc(var(--spacing-lg) + 60px) var(--spacing-sm) var(--spacing-sm);
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-footer {
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .project-stats {
    width: 100%;
    justify-content: center;
  }

  .btn-primary {
    width: 100%;
    justify-content: center;
  }
}

.icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
  vertical-align: middle;
  margin-right: 4px;
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

.results-info {
  text-align: center;
  color: var(--text-light);
  margin-bottom: var(--spacing-lg);
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .search-box {
    margin: 0 var(--spacing-md) var(--spacing-lg);
  }
}
</style> 