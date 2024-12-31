export default defineNuxtRouteMiddleware((to) => {
  // 检查路由是否存在
  const nuxtApp = useNuxtApp()
  const routes = nuxtApp.$router.getRoutes()
  const routeExists = routes.some(route => 
    route.path === to.path || 
    (route.path.includes(':') && to.matched.length > 0)
  )

  // 如果路由完全不存在（不包括 [...slug] 捕获的路由）才显示 404
  if (!routeExists && to.name !== 'error' && !to.path.startsWith('/')) {
    abortNavigation({
      statusCode: 404,
      statusMessage: '页面未找到'
    })
  }
}) 