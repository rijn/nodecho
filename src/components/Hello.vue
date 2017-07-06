<template>
    <div class="hello">
        <template v-if="posts">
            <i-content
                v-for="post in posts"
                :title="post.title"
                :content="post.summary"
                :to="{ name: 'Post', params: { id: post.id } }" />
        </template>
        <router-link :to="{ name: 'Post', params: { id: 1 } }">Link</router-link>
    </div>
</template>

<script>
import Content from './Content';

export default {
    name: 'hello',

    components: { iContent: Content },

    data () {
        return {
            offset: 0,
            limit: 10,
            posts: null
        };
    },

    methods: {
        fetch () {
            this.$api.posts
                .get()
                .then(res => {
                    this.posts = res.body;
                });
        }
    },

    mounted () {
        this.fetch();
    }
};
</script>

<style lang="less" scoped>
.hello {
    overflow: hidden;
}
</style>
