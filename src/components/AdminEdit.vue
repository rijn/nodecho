<template>
    <div>
        <div class="panel">
            <i-button @click="submit">Submit</i-button>
            <i-button @click="remove">delete</i-button>
        </div>
        <div class="panel" v-if="form">
            <i-form :model="form" label-position="right" :label-width="100">
                <row>
                    <i-col span="12">
                        <form-item label="Title">
                            <i-input v-model="form.title"></i-input>
                        </form-item>
                    </i-col>
                    <i-col span="12">
                        <form-item label="Location">
                            <i-input v-model="form.location"></i-input>
                        </form-item>
                    </i-col>
                </row>
                <row>
                    <i-col span="12">
                        <form-item label="Private">
                            <i-switch v-model="form.private">
                            </i-switch>
                        </form-item>
                    </i-col>
                    <i-col span="12">
                        <form-item label="Password">
                            <i-input v-model="form.password"></i-input>
                        </form-item>
                    </i-col>
                </row>
                <form-item label="Summary">
                    <i-input v-model="form.summary" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }"></i-input>
                </form-item>
                <form-item>
                    <upload v-on:success="insertImage"></upload>
                </form-item>
                <form-item label="Content">
                    <i-input
                        class="editor"
                        v-model="form.content"
                        type="textarea"
                        :autosize="{ minRows: 20, maxRows: 50 }">
                    </i-input>
                </form-item>
            </i-form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Message from 'iview/src/components/message';
import Button from './Button';
import Input from 'iview/src/components/input';
import Form from 'iview/src/components/form';
import Switch from 'iview/src/components/switch';
import { Row, Col } from 'iview/src/components/grid';
import Upload from './Upload';

var pick = (o, props) => {
    return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})));
};

const emptyFrom = {
    title: '',
    password: '',
    private: true,
    summary: '',
    content: '',
    location: ''
};

export default {
    name: 'AdminEdit',

    components: {
        Message,
        iButton: Button,
        iInput: Input,
        iForm: Form,
        FormItem: Form.Item,
        iSwitch: Switch,
        Row,
        iCol: Col,
        Upload
    },

    data () {
        return {
            form: null
        };
    },

    computed: {
        ...mapGetters('token', [ 'token', 'isLogin' ])
    },

    watch: {
        isLogin () { this.verifyIsLogin(); },
        '$route': {
            deep: true,
            handler (to) { if (to.name === this.$options.name) { this.fetch(); } }
        }
    },

    methods: {
        verifyIsLogin () {
            if (!this.isLogin) this.$router.push({ name: 'AdminHome' });
        },
        fetch () {
            if (this.$route.params.id !== 'new') {
                this.form = null;
                this.$api.posts
                    .get(Object.assign(
                        { id: this.$route.params.id },
                        this.token
                    ))
                    .then(res => {
                        this.form = res.body;
                    })
                    .catch(err => {
                        Message.error(err.body.error);
                    });
            } else {
                this.$nextTick(() => { this.form = Object.assign({}, emptyFrom); });
            }
        },
        submit () {
            (this.$route.params.id === 'new'
                ? this.$api.posts.save
                : this.$api.posts.update)(
                    this.$route.params.id === 'new'
                        ? {} : { id: this.$route.params.id },
                    Object.assign(
                        pick(this.form, Object.keys(emptyFrom)),
                        this.token
                    )
                )
                .then(res => {
                    Message.success('Update successfully');
                    if (this.$route.params.id === 'new') {
                        this.$router.push({ name: 'AdminEdit', params: { id: res.body.id } });
                    }
                })
                .catch(err => {
                    Message.error(err.body.error);
                });
        },
        remove () {
            if (this.$route.params.id === 'new') {
                this.$router.back();
            } else {
                this.$api.posts
                    .remove({ id: this.$route.params.id }, this.token)
                    .then(res => {
                        Message.success('Remove successfully');
                        this.$router.push({ name: 'AdminPost' });
                    })
                    .catch(err => {
                        Message.error(err.body.error);
                    });
            }
        },
        insertImage (path) {
            this.form.content = this.form.content + `![](${path})`;
        }
    },

    mounted () {
        this.verifyIsLogin();
        this.fetch();
    }
};
</script>

<style lang="less" scoped>
.panel {
    padding: 0.5rem;
    margin: 0.5rem 0.5rem 1rem 0.5rem;
    background: #fff;

    position: relative;
    display: block;
}
.toolbar {
}
</style>

<style>
.ivu-form-item:after, .ivu-row:after {
    clear: both;
}
</style>
