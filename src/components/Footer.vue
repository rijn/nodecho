<template>
    <footer>
        <ul>
            <li>
                &copy; Rijn, 2017
            </li>
            <li>
                <a href="https://rijnx.com/">Homepage</a>
            </li>
            <li>
                <a href="http://blog.rijnx.com/">Blog</a>
            </li>
            <li>
                <a href="https://github.com/rijn">GitHub</a>
            </li>
            <li class="right">
                <logo dark width="40px"/>
            </li>
        </ul>
    </footer>
</template>

<script>
import Logo from './Logo';

export default {
    name: 'footer',

    components: { Logo },

    data () {
        return {
        };
    },

    methods: {
    }
};
</script>

<style lang="less" scoped>
ul {
    padding: 0.5rem;
    font-size: 0.8rem;

    li {
        display: inline-block;
        vertical-align: middle;

        padding: 0 0.25rem;

        &:first-child {
            padding-left: 0;
        }

        &:last-child {
            padding-right: 0;
        }

        &.right {
            float: right;
        }
    }
}
</style>
