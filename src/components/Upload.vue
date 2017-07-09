<template>
    <i-upload
        action="/api/files"
        :data="token"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :show-upload-list="false">
        <i-button>Upload</i-button>
    </i-upload>
</template>

<script>
import { mapGetters } from 'vuex';
import Message from 'iview/src/components/message';
import Button from './Button';
import Upload from 'iview/src/components/upload';

export default {
    name: 'Upload',

    components: { Message, iButton: Button, iUpload: Upload },

    computed: {
        ...mapGetters('token', [ 'token', 'isLogin' ])
    },

    methods: {
        uploadSuccess (response) {
            this.$emit('success', `/files/${response.key}`);
        },
        uploadError () {
            Message.error('Internal error');
        }
    }
};
</script>
