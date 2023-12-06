<template>
	<footer class="app-footer">
        <p>&copy; 2023 Mr-Bitcoin.com. All rights reserved.</p> | 
        <RouterLink to="/about">About</RouterLink>
	</footer>
</template>

<script>
export default {}
</script>

<style lang="scss">
.app-footer {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    
    height: 5vh;
    padding: 10px;
    background-color: #4d6478;

    p {
    margin: 0;
    font-size: 0.9em;
    color: #fff;
  }

    a {
        text-decoration: none;
        color: #fff;
    }
}

@media (max-width: 600px) {
    .app-footer {
        height: 10vh;
    }
}

</style>
