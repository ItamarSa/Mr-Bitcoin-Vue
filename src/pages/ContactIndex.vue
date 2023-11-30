<template>
    <section class="contact-index">
        <h1>contacts</h1>
        <RouterLink to="contact/edit">
            <button>Add a Contact</button>
        </RouterLink>
        <ContactList @remove="removeContact" v-if="contacts" :contacts="contacts"/>
        <img v-else src="../assets/puff.svg" alt="" class="loader">
   </section>
</template>

<script>
import {contactService} from '../services/contact.service.js'

import ContactList from '../cmps/contactlist.vue'

export default {
    data() {
        return {
            contacts: null,
            filterBy: {txt: ''}


        }
    },
    methods: {
        async removeContact(contactId) {
            await contactService.remove(contactId)
            const idx = this.contacts.findIndex(contact => contact._id === contactId)
            this.contacts.splice(idx, 1)
        }
    },
    async created() {
        this.contacts = await contactService.query()

    },
    components:{
        ContactList,
    }
}
</script>

<style lang="scss">

</style>