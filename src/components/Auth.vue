<template>
    <div class="auth">
        <input v-model="username">
        <input v-model="password">
        <i-button @click="requestToken">Request Token</i-button>
    </div>
</template>

<script>
import Button from './Button';
import Message from 'iview/src/components/message';

export default {
    name: 'auth',

    components: { iButton: Button },

    data () {
        return {
            username: null,
            password: null
        };
    },

    methods: {
        requestToken () {
            this.$api.tokens
                .generate({
                    username: this.username,
                    password: this.password
                })
                .then(res => {
                    console.log(res);
                })
                .catch(res => {
                    Message.error(res.body.error);
                });
        }
    }
};
</script>

<style scoped>
</style>
