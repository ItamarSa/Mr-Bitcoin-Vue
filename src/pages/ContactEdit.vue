<template>
    <h1>Contact edit</h1>
    <section v-if="contact" class="contact-edit">
        <form @submit.prevent="onSaveContact">
            <input placeholder="Name" v-model="contact.name" type="text" autofocus>
            <input placeholder="email" v-model="contact.email" type="text">
            <input placeholder="Phone" v-model="contact.phone" type="text">
            <button>Save</button>
        </form>
    </section>
    <img v-else src="../assets/puff.svg" alt="" class="loader">
</template>

<script>
import { contactService } from '../services/contact.service'
import { eventBus } from '../services/eventBus.service'

export default {
    data() {
        return {
            contact: null,
        }
    },
    methods: {
        async onSaveContact() {
            const isUpdate = !!this.$route.params.contactId
            try {
                await this.$store.dispatch({ type: 'saveContact', contact: this.contact})
                // await contactService.save(this.contact)

                if (isUpdate) {
                    eventBus.emit('user-msg', 'Contact Updated')
                } else {
                    eventBus.emit('user-msg', 'Contact Saved')
                }
            } catch (err){
                eventBus.emit('user-msg', 'Couldn\'t save contact')
            }

            this.$router.push('/contact')
        }
    },
    async created() {
        const contactId = this.$route.params.contactId
        if (contactId) {
            this.contact = await contactService.get(contactId)
        } else {
            this.contact = contactService.getEmptyContact()
        }
    }
}
</script>

<style lang="scss">
.contact-edit {
    display: grid;
    padding: 10px;
    background-color: darkseagreen;

    a {
        justify-self: end;
    }
}
</style>