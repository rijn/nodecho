<template>
    <article class="post">
        <header class="post-header">
            <h1 class="post-title">
                <router-link class="post-title-link" :to="to">
                    {{ title }}
                </router-link>
            </h1>
        </header>
        <section class="post-excerpt post-markdown">
            <p>
                {{ content }}
            </p>
        </section>
        <footer class="post-meta" style="display:none">
            <!--<%= data.tags.join(",") %>-->
            <time class="post-date" datetime="<%= data.time %>"><%= new Date(Number(data.time)).toDateString() %></time></time>
        </footer>
    </article>
</template>

<script>
export default {
    name: 'content',

    props: {
        title: String,
        content: String,
        to: Object
    }
};
</script>

<style lang="less" scoped>
.post {
    position: relative;
    width: 80%;
    max-width: 780px;
    margin: 4rem auto;
    padding-bottom: 4rem;
    border-bottom: #EBF2F6 1px solid;
    word-break: break-word;
    hyphens: auto;

    font-size: 20px;

    @media screen and (max-width: 769px) {
        font-size: 15px;
    }

    header {
        h1.post-title {
            font-size: 2.2em;
        }
    }
}

.post-index{
    position: relative;
    width: 80%;
    max-width: 780px;
    padding: 4rem auto;
    word-break: break-word;
    hyphens: auto;
}

.post-meta {
    display: block;
    margin: 2rem 0 0.6rem 0;
    font-size: 1.5em;
    line-height: 2.2em;
    color: #9EABB3;
}

.post-date,
.post-views {
    display: inline-block;
    margin-left: 8px;
    padding-left: 12px;
    border-left: #d5dbde 1px solid;
    text-transform: uppercase;
    font-size: 1.3em;
    white-space: nowrap;
}


.post-markdown {
    margin: 2rem 0 0 0;
    font-size: 1em;
    line-height: 1.8em;
}

.post-markdown img{
    width: 100%;
}

.post-markdown h1 {
    font-size: 2em;
    letter-spacing: -2px;
    text-indent: -1px;
}

.post-markdown h2 {
    font-size: 1.8em;
    text-indent: -1px;
}

.post-markdown h3 {
    font-size: 1.6em;
    text-indent: 0px;
}

.post-markdown h4 {
    font-size: 1.4em;
}

.post-markdown h5 {
    font-size: 1.2em;
}

.post-markdown h6 {
    font-size: 1.1em;
}

.post-markdown p {
    font-size: 1em;
}

.post-markdown blockquote {
    margin-left: -35px;
    margin-right: 0;
    padding-left: 30px;
    font-style: italic;
    font-family: "Lucida Grande", sans-serif;
    border-left: solid 5px rgb(74, 74, 74)
}

.post-markdown hr {
    border: 0;
    border-top: solid 1px #EBF2F6;
}

.post-markdown code {
    background: rgba(0, 0, 0, 0.07);
    padding: 2px 4px;
    border-radius: 3px
}

.post-markdown pre > code {
    background: 0;
    padding: 0;
    margin: 0;
    font-size: 0.8em;
    line-height: 1em;
    font-family: "Lucida Grande", sans-serif;
}

.post-markdown a {
    color: #eb8dc5;
    /*color: rgb(0, 136, 204)*/
}

.post-markdown a:hover {
    color: #eb6ab7;
    /*color: rgb(0, 100, 170)*/
}
</style>
