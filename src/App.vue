<script>
import AppHeader from './cmps/AppHeader.vue'
import AppFooter from './cmps/AppFooter.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
  }
}
</script>

<template>
  <AppHeader />
  <main>
    <RouterView />
  </main>
  <AppFooter />
</template>

<style scoped>
main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  padding-inline: 5vw;
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
