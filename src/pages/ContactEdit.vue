<!-- <template>
    <h1>Contact Edit</h1>
    <section v-if="contact" class="contact-edit">
        <form @submit.prevent="onSaveContact">
            <input v-modal="contact.name" type="text" autofocus>
            <input v-modal="contact.email" type="text">
            <input v-modal="contact.phone" type="text">
            <button>save</button>
        </form>
    </section>
    <img v-else src="../assets/puff.svg" alt="" class="loader">
</template>

<script>
import { contactService } from '../services/contact.service';
import { eventBus } from '../services/eventBus.service'
export default {
    data(){
        return {
            contact: null
        }

    },
    methods: {
        async onSaveContact() {
            const isUpdate = !!this.$route.params.contactId
            await contactService.save(this.contact)

            if(isUpdate){
                eventBus.emit('user-msg', 'Contact Updated')
            } else {
                eventBus.emit('user-msg', 'Contact Saved')
            }
            this.$router.push('/contact')
        }
    },
    async created () {
        const contactId = this.$route.params.contactId
        
        if(contactId) {
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

</style> -->
<template>
    <h1>
        contact edit
    </h1>
    <section v-if="contact" class="contact-edit">
        <form @submit.prevent="onSaveContact">
            <input v-model="contact.name" type="text" autofocus>
            <input v-model="contact.email" type="text">
            <input v-model="contact.phone" type="text">
            <button>Save</button>
        </form>
    </section>
    <img v-else src="../assets/puff.svg" alt="" class="loader">
</template>
<script>
import { contactService } from '../services/contact.service';
import { eventBus } from '../services/eventBus.service';
export default {
    data() {
        return {
            contact: null,
        }
    },
    methods: {
        async onSaveContact() {
            const isUpdate = !!this.$route.params.contactId
            await contactService.save(this.contact)
            if(isUpdate){
                eventBus.emit('user-msg', 'Contact Updated')
            } else {
                eventBus.emit('user-msg', 'Contact Saved')
            }
            this.$router.push('/contact')
        }
    },
    async created(){
        const contactId =this.$route.params.contactId
        if (contactId) {
            this.contact = await contactService.get(contactId)
        }else{
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