<template>
    <header>
        <div
            class="thick"
            v-if="$route.name === 'Hello'"
            :style="{ minHeight: fullHeight + 'px' }">
            <div class="thick-inner">
                <ul>
                    <li>
                        <logo />
                    </li>
                    <li class="right pc-only">
                        <i-button type="ghost" @click="toSourceCode">Source Code on Github</i-button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="thin" v-else>
            <div class="thin-inner">
                <ul>
                    <li>
                        <router-link :to="{ name: 'Hello' }"><logo /></router-link>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
import Logo from './Logo';
import Button from './Button';

export default {
    name: 'header',

    components: { Logo, iButton: Button },

    data () {
        return {
            fullHeight: document.documentElement.clientHeight,
            backgroundImage: '../assets/cat-sakura-road-japan.jpg'
        };
    },

    computed: {
        path: function () {
            return this.$route
                ? this.$route.path.split('/').filter(comp => !!comp).map(c => c.toUpperCase())
                : [];
        }
    },

    ready: function () {
        window.addEventListener('resize', this.handleResize);
    },

    beforeDestroy: function () {
        window.removeEventListener('resize', this.handleResize);
    },

    methods: {
        handleResize (event) {
            this.fullHeight = document.documentElement.clientHeight;
        },
        toSourceCode () {
            let url = 'https://github.com/rijn/nodecho';
            let win = window.open(url, '_blank');
            win.focus();
        }
    }
};
</script>

<style lang="less" scoped>
@import '../styles/index.less';

header {
    position: relative;
    // margin-bottom: 5rem;
    background: @text-color no-repeat center center;
    overflow: hidden;
    color: #fff;
    transition: all ease 0.3s;

    line-height: 1;

    font-size: 1rem;

    .thick {
        background-size: cover;
        background-image: url(../assets/cat-sakura-road-japan.jpg);
        display: table;
        width: 100%;
        height: 100%;

        .thick-inner {
            padding: 2rem;
        }
    }

    .thin {
        .thin-inner {
            padding: 2rem;

            // @media screen and (max-width: 769px) {
                ul {
                    text-align: center;
                }
            // }
        }
    }

    ul {
        padding: 0;
        margin: 0;
        overflow: hidden;

        li {
            vertical-align: middle;
            display: inline-block;
            overflow: hidden;

            margin: 0;
            padding: 0 0.5rem;

            &.right {
                float: right;
            }
        }
    }
}
</style>
