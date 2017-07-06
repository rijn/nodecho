<template>
    <div>
        <div class="panel">
            <i-button @click="fetch">Refresh</i-button>
            <i-button @click="newPost">New Post</i-button>
        </div>
        <div class="panel" v-if="posts">
            <i-table border :columns="columns" :data="posts"></i-table>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Message from 'iview/src/components/message';
import Button from './Button';
import Table from 'iview/src/components/table';

export default {
    name: 'AdminPost',

    components: { Message, iButton: Button, iTable: Table },

    data () {
        return {
            columns: [
                {
                    title: 'Created At',
                    key: 'created_at',
                    sortable: true,
                    render: (h, params) => {
                        return h('div', new Date(params.row.created_at).toLocaleString());
                    }
                },
                {
                    title: 'Title',
                    key: 'title',
                    sortable: true
                },
                {
                    title: 'View',
                    key: 'view',
                    sortable: true
                },
                {
                    title: 'Operation',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: 'AdminEdit',
                                            params: {
                                                id: params.row.id
                                            }
                                        });
                                    }
                                }
                            }, 'Edit')
                        ]);
                    }
                }
            ],
            posts: null
        };
    },

    computed: {
        ...mapGetters('token', [ 'token', 'isLogin' ])
    },

    methods: {
        fetch () {
            this.posts = null;
            this.$api.posts
                .get()
                .then(res => {
                    this.posts = res.body;
                })
                .catch(err => {
                    Message.error(err.body.error);
                });
        },
        newPost () {
            this.$router.push({ name: 'AdminEdit', params: { id: 'new' } });
        }
    },

    mounted () {
        this.fetch();
    }
};
</script>

<style lang="less" scoped>
.panel {
    padding: 0.5rem;
    margin: 0.5rem 0.5rem 1rem 0.5rem;
    background: #fff;
}
</style>
