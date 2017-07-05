<template>
    <div class="post">
        <div class="auth">
            <auth />
        </div>
    </div>
</template>

<script>
import Auth from './Auth';
import Content from './Content';

export default {
    name: 'hello',

    components: { Auth, Content },

    data () {
        return {
        };
    },

    methods: {
        fetch () {
            this.$api.files
                .get()
                .then(res => {
                    console.log(res);
                });
        }
    }
};
</script>

<style lang="less" scoped>
.post {
    background: #f3f3f3;
}

.auth {
    max-width: 400px;
    padding: 1em;
    margin: 0 auto;
}
</style>
