<template>
    <article class="signup-page">
        <img class="sign-img" src="../assets/imgs/bitcoin.png" alt="bitcoin-img">
        <h2>Please enter your name</h2>
        <form class="signup-form" @submit.prevent="getUserByName">
            <input v-model="userName" autofocus type="text" placeholder="Enter your name">
            <button>Welcome</button>
        </form>
    </article>
</template>

<script>
import { userService } from '../services/user.service'
export default {
    data() {
        return {
            userName: ''

        }
    },
    methods: {
        async getUserByName() {
            try {
                let user = await userService.get(this.userName)
                console.log('user', user)
                if (!user) {
                    console.log('User not found')
                    user = userService.getEmptyUser()
                    user.name = this.userName
                    user = await userService.save(user)
                    console.log('user', user)
                } else {
                    console.log('User exists:', user)
                }
                userService.saveLoggedInUser(user)
                this.$router.push(`/:${user._id}`)
            } catch (err) {
                console.log('Error creating user', err)
            }
        }
    },
}
</script>

<style lang="scss">
.signup-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;

    h2 {
        font-size: 1.5em;
        margin-bottom: 20px;
    }

    .sign-img {
        width: 4em;
    }

    .signup-form {
        display: flex;
        flex-direction: column;

        input[type="text"] {
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            width: 250px;
            font-size: 1em;

            &:focus {
                outline: none;
                border-color: dodgerblue;
            }

            &::placeholder {
                color: #999;
            }
        }

        button {
            padding: 8px 20px;
            background-color:#4d6478;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1em;

            &:hover {
                background-color: #bdc4cb;
                color: #2c3e50;
                border: 1px solid #2c3
            }

            &:focus {
                outline: none;
            }
        }

    }
}</style>