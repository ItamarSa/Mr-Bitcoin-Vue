<template>
    <section class="contact-index">
        <h1>contacts</h1>
        <ContactFilter @filter="setFilterBy"/>
        <RouterLink to="contact/edit">
            <button>Add a Contact</button>
        </RouterLink>
        <ContactList @remove="removeContact" v-if="contacts" :contacts="filteredContacts"/>
        <img v-else src="../assets/puff.svg" alt="" class="loader">
   </section>
</template>

<script>
// import {contactService} from '../services/contact.service.js'
import {eventBus} from '../services/eventBus.service.js'

import ContactList from '../cmps/contactlist.vue'
import ContactFilter from '../cmps/ContactFilter.vue'
export default {
    data() {
        return {
            // contacts: null,
            filterBy: {txt: ''}


        }
    },
    methods: {
        async removeContact(contactId) {
            try {
                await this.$store.dispatch({type: 'removeContact', contactId})
                eventBus.emit('user-msg', `Contact ${contactId} deleted...`)
            } catch(err) {
                eventBus.emit('user-msg', 'Couldn\'t remove contact..')

            }
            // await contactService.remove(contactId)
            // const idx = this.contacts.findIndex(contact => contact._id === contactId)
            // this.contacts.splice(idx, 1)


        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        contacts() {
            return this.$store.getters.contacts
        },
        filteredContacts() {
            const regex = new RegExp(this.filterBy.txt, 'i')
            return this.contacts.filter(contact => regex.test(contact.name))
        }
    },
    async created() {
    //     this.contacts = await contactService.query()
    try {
        this.$store.dispatch({ type: 'loadContacts' })
    } catch (err) {
        eventBus.emit('user-msg', 'Couldn\'t get contacts..')
    }


    },
    components:{
        ContactList,
        ContactFilter
    }
}
</script>

<style lang="scss">

</style>