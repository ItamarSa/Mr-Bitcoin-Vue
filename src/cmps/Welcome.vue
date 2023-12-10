<template>
  <section class="welcome-page">
    <header>
      <h1>Welcome to Mr Bitcoin</h1>
    </header>
    <main>
      <img class="login-img" src="../assets/imgs/bit-gif.gif" alt="">
      <h2>The only crypto wallet you’ll ever need</h2>
      <p>Buy, store, and do more with your crypto.</p>
      <RouterLink v-if="loggedInUser" to="/:id">
        <button class="start-btn">Get Started</button>
      </RouterLink>
      <RouterLink v-else to="/signup">
        <button class="start-btn">Get Started</button>
      </RouterLink>
    </main>
  </section>
</template>

<script>
import { userService } from '../services/user.service'
export default {
  data() {
    return {
      loggedInUser: null,
    }
  },
  async created() {
    this.loggedInUser = userService.getLoggedInUserFromStorage()
  }
}
</script>

<style lang="scss">
.welcome-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 50px;

  main {
    margin-top: 20px;

    .login-img {
      width: 6em;
    }

    p {
      color: darken(lightblue, 20%);
      font-size: 18px;
    }

    .start-btn {
      background-color: #4d6478;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      padding: 10px 20px;
      margin-top: 10px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: darken(#4d6478, 10%);
      }
    }
  }

  header h1 {
    color: #4d6478;
    margin-top: 0;
  }
}
</style>