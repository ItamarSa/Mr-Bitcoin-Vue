<template>
    <article class="contact-preview">
        <h2>{{contact.name}}</h2>
        <p>{{contact.phone}}</p>
    </article>
</template>

<script>
export default {
    props: {
        contact: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style lang="scss">

</style>