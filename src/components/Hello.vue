<template>
    <div class="hello">
        <i-button>hhh</i-button>
    </div>
</template>

<script>
import Button from './Button';

export default {
    name: 'hello',

    components: { iButton: Button },

    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        };
    }
};
</script>

<style scoped>
h1, h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
