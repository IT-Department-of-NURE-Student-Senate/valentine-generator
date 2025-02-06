export default defineNuxtRouteMiddleware((from, to) => {
  const valentineId = useCookie('valentine-card-id');

  if (!valentineId || to.params.id !== valentineId.value) {
    return navigateTo('/');
  }
});
