<template>
    <div id="app">
        <i-header />
        <div id="core">
            <router-view></router-view>
        </div>
        <i-footer />
    </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';

export default {
    name: 'app',

    components: { iHeader: Header, iFooter: Footer }
};
</script>

<style lang="less">
@import './styles/index.less';

html {
    font-family: 'NotoSans-Regular', sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    font-size: 12px;
}

body {
    font-family: @font-family;
    font-size: @font-size-small;
    line-height: @line-height-base;
    color: @text-color;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

#core {
    background: @background-color-base;
}

* {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

*:before,
*:after {
    box-sizing: border-box;
}

body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, form, fieldset, legend, input, textarea, p, blockquote, th, td, hr, button, article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    margin: 0;
    padding: 0;
}

button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}

ul,
ol {
    list-style: none;
}

input::-ms-clear, input::-ms-reveal {
    display: none;
}

a {
    color: @link-color;
    background: transparent;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    transition: color @transition-time ease;

    &:hover {
        color: @link-hover-color;
    }

    &:active {
        color: @link-active-color;
    }

    &:active,
    &:hover {
        outline: 0;
        text-decoration: none;
    }

    &[disabled] {
        color: #ccc;
        cursor: @cursor-disabled;
        pointer-events: none;
    }
}

code,
kbd,
pre,
samp {
    font-family: @code-family;
}

@media screen and (max-width: 769px) {
    .pc-only {
        display: none !important;
    }
}
@media screen and (min-width: 768px) {
    .mobile-only {
        display: none !important;
    }
}
</style>
