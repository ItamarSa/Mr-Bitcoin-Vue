import { contactService } from '../../services/contact.service'

export default {
    strict: true,
    state() {
        return {
            contacts: null,
        }
    },
    mutations: {
        setContacts(state, {contacts}){
            state.contacts = contacts
        }
    },
    actions: {
        async loadContacts(context){
            try {
                const contacts = await contactService.query()
                context.commit({ type: 'setContacts', contacts})
            } catch(err){
                console.log(err)
                throw err
            }
        }

    },
    getters: {

    },
    modules: {

    },
}