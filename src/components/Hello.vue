<template>
    <div class="hello">
        <auth />
    </div>
</template>

<script>
import Auth from './Auth';

export default {
    name: 'hello',

    components: { Auth },

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

<style scoped>
</style>
