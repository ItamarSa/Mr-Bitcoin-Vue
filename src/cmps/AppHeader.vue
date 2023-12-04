<template>
    <header class="app-header">
        <a href="/">
            <h2>Mr Bitcoin</h2>
        </a>
        <nav>
            <RouterLink to="/">Home</RouterLink> |
            <RouterLink to="/contact">Contacts</RouterLink> |
            <RouterLink to="/about">About</RouterLink> | 
            <RouterLink to="/charts">Charts</RouterLink> 
        </nav>
    </header>
</template>

<script>
export default {
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
}</style>