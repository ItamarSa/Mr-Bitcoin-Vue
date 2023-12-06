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
/* header {
  line-height: 1.5;
  max-height: 100vh;
} */
/* 
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
} */
/* 
nav a.router-link-exact-active {
  color: var(--color-text);
} */

/* nav a.router-link-exact-active:hover {
  background-color: transparent;
} */

/* nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
} */
</style>
