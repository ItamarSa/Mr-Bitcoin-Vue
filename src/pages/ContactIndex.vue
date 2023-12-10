<template>
    <section class="contact-index">
        <ContactFilter @filter="setFilterBy" />
        <RouterLink to="/edit">
            <button>Add a Contact</button>
        </RouterLink>
        <ContactList @remove="removeContact" v-if="contacts" :contacts="filteredContacts" />
        <img v-else src="../assets/puff.svg" alt="" class="loader">
    </section>
</template>

<script>
// import {contactService} from '../services/contact.service.js'
import { eventBus } from '../services/eventBus.service.js'

import ContactList from '../cmps/contactlist.vue'
import ContactFilter from '../cmps/ContactFilter.vue'
export default {
    data() {
        return {
            filterBy: { txt: '' }
        }
    },
    methods: {
        async removeContact(contactId) {
            try {
                await this.$store.dispatch({ type: 'removeContact', contactId })
                eventBus.emit('user-msg', `Contact ${contactId} deleted...`)
            } catch (err) {
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
    components: {
        ContactList,
        ContactFilter
    }
}
</script>

<style lang="scss">
.contact-index {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    background-color: #f0f0f0;

    button {
        padding: 10px 20px;
        margin-top: 10px;
        font-size: 1em;
        background-color: #4d6478;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #2c3e50;
        }
    }
}

.loader {
    width: 100px;
    height: 100px;
    margin: 50px auto;
    display: block;
}
</style>