export default defineNuxtRouteMiddleware((to) => {
  // 检查路由是否存在
  const nuxtApp = useNuxtApp()
  const routes = nuxtApp.$router.getRoutes()
  const routeExists = routes.some(route => 
    route.path === to.path || 
    (route.path.includes(':') && to.matched.length > 0)
  )

  // 如果路由不存在且不是错误页面，显示404
  if (!routeExists && to.name !== 'error') {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found'
    })
  }
}) 