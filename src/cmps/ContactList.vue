<template>
    <ul class="contact-list">
        <TransitionGroup name="list" tag="ul">
            <li v-for="contact in contacts" :key="contact._id">
                <ContactPreview :contact="contact" />
                <section class="active">
                    <RouterLink :to="`/contact/${contact._id}`">
                        <button title="Details">👁</button>
                    </RouterLink>
                    <RouterLink :to="`/edit/${contact._id}`">
                        <button title="Edit"><img class="list-btn" src="../assets/imgs/edit.png" alt=""></button>
                    </RouterLink>
                    <RouterLink :to="`/contact/transfer/${contact._id}`">
                        <button>💵</button>
                    </RouterLink>
                    <button title="Delete" @click="onRemoveContact(contact._id)">
                        <img class="list-btn" src="../assets/imgs/delete.png" alt="">
                    </button>
                </section>
            </li>
        </TransitionGroup>
    </ul>
    <RouterView />

</template>

<script>
import ContactPreview from '../cmps/ContactPreview.vue'

export default {
    props: {
        contacts: {
            type: Array,
            required: true,
        }
    },
    methods: {
        onRemoveContact(contactId) {
            this.$emit('remove', contactId)
        }
    },
    emits: ['remove'],
    components: {
        ContactPreview,
    }
}
</script>

<style lang="scss">
ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    padding: 0;
    list-style: none;

    li {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background-color: #f0f0f0;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: 300px;

        button {
            margin-top: 10px;
            margin-left: 5px;
            width: 62px;
            height: 42px;
            padding: 8px 16px;
            font-size: 0.9em;
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

    .list-btn {
        width: 15px;
    }
}


.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.list-leave-active {
    position: absolute;
}
</style>