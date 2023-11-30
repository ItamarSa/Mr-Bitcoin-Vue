<template>
    <section class="contact-index">
        <h1>contacts</h1>
        <pre>{{contacts}}</pre>
    </section>
</template>

<script>
import {contactService} from '../services/contact.service.js'
export default {
    data() {
        return {
            contacts: null,


        }
    },
    async created() {
        this.contacts = await contactService.query()

    }
}
</script>

<style lang="scss">

</style>