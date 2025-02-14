export default defineNuxtRouteMiddleware((to) => {
  const config = useRuntimeConfig();

  const allowedRoutes = ['/disabled'];

  if (config.public.isDisabled && !allowedRoutes.includes(to.path)) {
    return navigateTo('/disabled');
  }
});
