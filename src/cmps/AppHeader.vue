<template>
    <header class="app-header">
        <a href="/">
            <h2>Mr Bitcoin</h2>
        </a>
        <nav>
            <RouterLink to="/:id?">
                <span v-if="isWideScreen">Home</span>
                <img v-else src="../assets/imgs/home.png" alt="Home Image">
            </RouterLink> |
            <RouterLink to="/contact">
                <span v-if="isWideScreen">Contacts</span>
        <img v-else src="../assets/imgs/users.png" alt="Contact Image">
            </RouterLink> |
            <RouterLink to="/charts">
                <span v-if="isWideScreen">Charts</span>
        <img v-else src="../assets/imgs/increase.png" alt="Charts Image">
            </RouterLink>
        </nav>
    </header>
</template>

<script>
export default {
    data() {
        return {
            isWideScreen: window.innerWidth >= 600,
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize)
    },
    methods: {
        handleResize() {
            this.isWideScreen = window.innerWidth >= 600
        },
    },
}
</script>

<style lang="scss">
.app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 5vh;
    padding-inline: 5vw;

    background-color: #4d6478;

    a {
        font-size: 1.2rem;
        text-decoration: none;
        color: #fff;
        transition: color 0.3s ease;

        &:hover {
            color: #60de11;
        }
    }

    .router-link-exact-active {
        color: white;
    }
}

@media (max-width: 600px) {
    .app-header {
        height: 10vh;
        img{
            width: 2em;
        }
    }
}
</style>