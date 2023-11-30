<template>
    <header class="app-header">
        <a href="/"><h2>Mr Bitcoin</h2></a>
        <nav>
            <RouterLink to="/">Home</RouterLink> |
            <RouterLink to="/contact">Contacts</RouterLink> |
            <RouterLink to="/about">About</RouterLink>
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
    justify-content:space-between;
    height: 5vh;

    padding: 10px;
    background-color: rgb(101, 222, 101);

    a {
        text-decoration: none;
    }

    .router-link-exact-active {
        color: white;
    }
}
</style>