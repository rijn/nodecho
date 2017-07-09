<template>
    <div class="hello">
        <div v-if="posts === null">
            <loading></loading>
        </div>
        <div v-else>
            <template v-if="posts.length > 0">
                <i-content
                    class="post"
                    v-for="post in posts"
                    :key="post.id"
                    :title="post.title"
                    :content="post.summary"
                    :to="{ name: 'Post', params: { id: post.id } }" />
            </template>
            <div v-else>
                NO MORE POST
            </div>
        </div>
        <div class="nav">
            <i-button
                type="primary"
                class="prev"
                @click="pushQuery({ offset: query.offset - query.limit < 0 ? 0 : query.offset - query.limit })"
                :disabled="query.offset <= 0">
                PREV
            </i-button>
            <i-button
                type="primary"
                class="next"
                @click="pushQuery({ offset: query.offset + query.limit })"
                :disabled="!(posts && posts.length >= query.limit)">
                NEXT
            </i-button>
        </div>
    </div>
</template>

<script>
import Button from './Button';
import Content from './Content';
import Loading from './Loading';

export default {
    name: 'hello',

    components: { iContent: Content, iButton: Button, Loading },

    data () {
        return {
            query: {
                offset: 0,
                limit: 10,
                sort: 'created_at@DESC'
            },
            posts: null
        };
    },

    watch: {
        '$route': {
            deep: true,
            handler: function (to) { if (to.name === this.$options.name) this.assignQuery(to); }
        }
    },

    methods: {
        fetch () {
            this.posts = null;
            this.$api.posts
                .get(this.query)
                .then(res => {
                    this.posts = res.body;
                });
        },
        assignQuery (route) {
            this.query.offset = parseInt(route.query.offset || '0');
            this.$nextTick(() => { this.fetch(); });
        },
        pushQuery (query) {
            this.$router.push({ name: 'Hello', query });
        }
    },

    mounted () {
        this.assignQuery(this.$route);
    }
};
</script>

<style lang="less" scoped>
@import '../styles/custom.less';

.hello {
    overflow: hidden;
}

.post:not(:last-child) {
    border-bottom: shade(@background-color-base, 10%) 1px solid;
}

.nav {
    text-align: center;
    padding: 3rem;
}
</style>
