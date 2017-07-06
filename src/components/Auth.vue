<template>
    <div class="auth" v-if="type === 'account'">
        <div class="login" v-if="!isLogin">
            <Row>
                <i-input v-model="username" placeholder="USERNAME"/>
            </Row>
            <Row>
                <i-input type="password" v-model="password" placeholder="PASSWORD"/>
            </Row>
            <Row>
                <i-button type="primary" @click="requestToken" long>Request Token</i-button>
            </Row>
        </div>
        <div class="logout" v-else>
            <i-button type="primary" @click="resetToken">Logout</i-button>
        </div>
    </div>
    <div class="auth" v-else>
        <div class="login">
            <Row>
                <i-input type="password" v-model="password" placeholder="PASSWORD"/>
            </Row>
            <Row>
                <i-button type="primary" @click="requestToken" long>Request Token</i-button>
            </Row>
        </div>
    </div>
</template>

<script>
import Button from './Button';
import Input from './Input';
import { Row } from 'iview/src/components/grid';
import Message from 'iview/src/components/message';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'auth',

    components: { iButton: Button, iInput: Input, Row },

    props: {
        type: {
            type: String,
            default: 'account'
        }
    },

    computed: {
        ...mapGetters('token', [ 'isLogin' ])
    },

    data () {
        return {
            username: null,
            password: null
        };
    },

    methods: {
        ...mapActions('token', { setToken: 'set', resetToken: 'reset' }),
        requestToken () {
            if (this.type === 'account') {
                this.$api.tokens
                    .generate({
                        username: this.username,
                        password: this.password
                    })
                    .then(res => {
                        this.username = this.password = null;
                        this.setToken(res.body);
                    })
                    .catch(res => {
                        Message.error(res.body.error);
                    });
            } else {
                this.$emit('submit', this.password);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.auth {
    display: block;
    background: #fff;

    text-align: center;
}

.login {
    font-size: 1.5em;

    & > *:not(:first-child) {
        padding-top: 0.5em;
    }

    button {
        padding: 1em;
    }
}
</style>
