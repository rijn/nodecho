<template>
    <footer>
        <ul>
            <li>
                <a>Homepage</a>
            </li>
            <li>
                <a>Blog</a>
            </li>
            <li>
                <a>CV</a>
            </li>
            <li>
                <a>Github</a>
            </li>
            <li class="right">
                <logo dark width="50px"/>
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
