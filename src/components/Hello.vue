<template>
    <div class="hello">
        <router-link :to="{ name: 'Post', params: { id: 1 } }">Link</router-link>
    </div>
</template>

<script>
export default {
    name: 'hello',

    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
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
</style>
