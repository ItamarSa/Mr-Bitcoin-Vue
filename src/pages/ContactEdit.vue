<template>
    <section v-if="contact" class="contact-edit">
        <h1 class="edit-head">{{ contact._id ? 'Edit Contact' : 'Add Contact' }} </h1>
        <form @submit.prevent="onSaveContact">
            <div class="edit-input">
                <label for="name">👤</label>
                <input placeholder="Name" v-model="contact.name" type="text" autofocus>
            </div>
            <div class="edit-input">
                <label for="name">📧</label>
                <input placeholder="email" v-model="contact.email" type="text">
            </div>
            <div class="edit-input">
                <label for="name">☎️</label>
                <input placeholder="Phone" v-model="contact.phone" type="text">
            </div>
            <button>Save</button>
        </form>
        <div class="action">
            <RouterLink to="/contact">
                <button>Back</button>
            </RouterLink>
        </div>
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
                await this.$store.dispatch({ type: 'saveContact', contact: this.contact })
                // await contactService.save(this.contact)

                if (isUpdate) {
                    eventBus.emit('user-msg', 'Contact Updated')
                } else {
                    eventBus.emit('user-msg', 'Contact Saved')
                }
            } catch (err) {
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #4d6478;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 10%;

    .edit-head {
        color: #fff;
        margin: 10px 0 20px;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 40%;

        .edit-input {
            display: flex;
            align-items: baseline;
        }

        input {
            margin-bottom: 15px;
            margin-left: 10px;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid #ccc;
            width: 100%;
            box-sizing: border-box;
        }

        button {
            padding: 10px 20px;
            font-size: 1em;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;

            &:hover {
                background-color: #0056b3;
            }
        }
    }

    .action {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;

        button {

            padding: 10px 20px;
            font-size: 1em;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;

            &:hover {
                background-color: #0056b3;
            }
        }
    }
}

.loader {
    width: 100px;
    height: 100px;
    margin: 50px auto;
    display: block;
}

@media (max-width: 600px) {
    .contact-edit {
        margin: 10% 0;

        form input {
            width: max-content;
        }
    }
}
</style>