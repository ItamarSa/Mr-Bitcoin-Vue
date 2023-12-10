<script>
import UserMsg from './cmps/UserMsg.vue'
import AppHeader from './cmps/AppHeader.vue'
import AppFooter from './cmps/AppFooter.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
    UserMsg
  }
}
</script>

<template>
  <Transition>
    <UserMsg />
  </Transition>
  <AppHeader />
  <main class="main-app">
    <RouterView />
  </main>
  <AppFooter />
</template>

<style scoped>
.main-app {
  min-height: 90vh;
  display: flex;
  flex-direction: column;

  padding-inline: 5vw;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

@media (max-width: 600px) {
  .main-app {
    min-height: 80vh;
  }
}
</style>
