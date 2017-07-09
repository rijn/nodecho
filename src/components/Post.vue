<template>
    <div v-if="loading" style="overflow: hidden;">
        <loading></loading>
    </div>
    <div class="post" v-else>
        <i-content
            v-if="post"
            :title="post.title"
            :content="post.content" />
        <template v-else>
            <div class="message" v-if="message">{{ message }}</div>
            <div class="auth">
                <auth v-if="authType" :type="authType" v-on:submit="submit" v-on:change="fetch"/>
            </div>
        </template>
    </div>
</template>

<script>
import Auth from './Auth';
import Content from './Content';
import Message from 'iview/src/components/message';
import store from 'store';
import { mapGetters } from 'vuex';
import Loading from './Loading';

export default {
    name: 'hello',

    components: { Auth, iContent: Content, Loading },

    data () {
        return {
            post: null,
            auth: {
                private: false,
                passwordRequired: false,
                password: null
            },
            message: null,
            loading: true
        };
    },

    computed: {
        ...mapGetters('token', [ 'token', 'isLogin' ]),
        authType: function () {
            return this.auth.private ? 'account' : this.auth.passwordRequired ? 'password' : null;
        }
    },

    watch: {
        '$route': {
            deep: true,
            handler (to, from) { if (to.name === this.$options.name) this.fetch(); }
        }
    },

    methods: {
        fetch () {
            this.post = this.message = null;
            this.loading = true;
            let password = store.get(this.$route.params.id) || { password: null };
            password = this.auth.password || password.password;
            this.$api.posts
                .get(Object.assign(
                    {
                        id: this.$route.params.id || '',
                        password: password
                    },
                    this.isLogin ? this.token : {}
                ))
                .then(res => {
                    this.loading = false;
                    this.post = res.body;
                    store.set(this.$route.params.id, { password });
                })
                .catch(err => {
                    this.loading = false;
                    this.message = err.body.error;
                    if (err.status !== 401) {
                        Message.error(err.body.error);
                        return;
                    }
                    if (err.body.passwordRequired) {
                        this.auth.passwordRequired = true;
                    } else {
                        this.auth.private = true;
                    }
                });
        },
        submit (password) {
            this.auth.password = password;
            this.fetch();
        }
    },

    mounted () {
        this.fetch();
    }
};
</script>

<style lang="less" scoped>
.auth {
    max-width: 400px;
    padding: 1rem;
    margin: 0 auto;
}

.message {
    padding: 1rem;
    text-align: center;
    font-size: 1.2rem;
}

.post {
    overflow: hidden;
}
</style>
