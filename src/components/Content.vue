<template>
    <article class="content" :class="{ poem: info && info.poem }">
        <header class="content-header">
            <h1 class="content-title">
                <router-link class="content-title-link" v-if="to" :to="to">
                    {{ title }}
                </router-link>
                <span class="content-title-link" v-else>
                    {{ title }}
                </span>
            </h1>
        </header>
        <section
            class="content-excerpt content-markdown markdown"
            v-html="contentHtml">
        </section>
        <footer class="content-info pc-only" v-if="footer && info">
            <!-- <time class="content-date" :datetime="info.created_at">{{ new Date(info.created_at).toDateString() }}</time> -->
            <div class="content-location">{{ info.location }}</div>
        </footer>
    </article>
</template>

<script>
import { markdown } from 'markdown';

export default {
    name: 'content',

    props: {
        title: String,
        content: String,
        to: Object,
        info: Object,
        footer: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        contentHtml: function () {
            if (this.info && this.info.poem) {
                return this.content.split(/\n/gi).map(line => line ? `<p>${line}</p>` : '<br/>').join('');
            } else {
                return markdown.toHTML(this.content || '');
            }
        }
    },

    methods: {
        includeStyleElement (styles, styleId) {
            var style = document.createElement('style');
            style.id = styleId;
            (document.getElementsByTagName('head')[0] || document.body).appendChild(style);
            if (style.styleSheet) {
                style.styleSheet.cssText = styles;
            } else {
                style.appendChild(document.createTextNode(styles));
            }
        }
    },

    mounted () {
        if (this.info && this.info.poem) {
            this.includeStyleElement(this.info.font, 'font');
        }
    }
};
</script>

<style lang="less" scoped>
.content {
    position: relative;
    width: 80%;
    max-width: 780px;
    margin: 4rem auto;
    @media screen and (max-width: 769px) {
        width: auto;
        padding: 0 1rem;
        margin: 1rem auto;
    }
    padding-bottom: 4rem;
    word-break: break-word;
    hyphens: auto;

    font-size: 20px;

    @media screen and (max-width: 769px) {
        font-size: 14px;
    }

    header {
        h1.content-title {
            font-size: 2em;
        }
    }

    .content-markdown {
        margin: 2rem 0 0 0;
        @media screen and (max-width: 769px) {
            margin: 0;
        }
        font-size: 1em;
        line-height: 1.8em;
        @media screen and (max-width: 769px) {
            line-height: 1.65em;
        }
    }

    .content-info {
        display: block;
        text-align: center;
        font-size: 0.7em;
    }
}

.poem {
    font-family: 'poem-font' !important;
    text-align: center;

    header, section {
        margin: 4rem auto !important;
    }

    .content-markdown {
        line-height: 1.2em;
        letter-spacing: 0.1em;
    }

    footer {
        margin-top: 7rem;
    }
}
</style>

<style lang="less">
@import '../styles/custom.less';

.markdown > * {
    margin: 0 0 1em 0;
}

.markdown img{
    width: 100%;
}

.markdown h1 {
    font-size: 2em;
    letter-spacing: -2px;
    text-indent: -1px;
}

.markdown h2 {
    font-size: 1.8em;
    text-indent: -1px;
}

.markdown h3 {
    font-size: 1.6em;
    text-indent: 0px;
}

.markdown h4 {
    font-size: 1.4em;
}

.markdown h5 {
    font-size: 1.2em;
}

.markdown h6 {
    font-size: 1.1em;
}

.markdown p {
    font-size: 1em;
}

.markdown blockquote {
    margin-left: -1.5em;
    margin-right: 0;
    padding-left: 1.5em;
    font-style: italic;
    font-family: "Lucida Grande", sans-serif;
    border-left: solid 5px @text-color;

    @media screen and (max-width: 769px) {
        margin-left: 0;
        margin-right: 0;
        padding-left: 1em;
        border-left: solid 4px @text-color;
    }
}

.markdown hr {
    border: 0;
    border-top: solid 1px @text-color;
    margin: 2em 0;
    @media screen and (max-width: 769px) {
        margin: 1em 0;
    }
}

.markdown code {
    background: rgba(0, 0, 0, 0.07);
    padding: 2px 4px;
    border-radius: 3px;
}

.markdown pre > code {
    background: 0;
    padding: 0;
    margin: 0;
    font-size: 0.8em;
    line-height: 1em;
    font-family: "Lucida Grande", sans-serif;
}
</style>
