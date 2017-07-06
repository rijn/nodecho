<template>
    <img src="../assets/logo@2x.gif" :style="{ width }" v-if="!dark">
    <img src="../assets/logo-invert@2x.gif" :style="{ width }" v-else>
</template>

<script>
export default {
    name: 'logo',

    props: {
        width: {
            type: String,
            default: '100%'
        },
        dark: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="less" scoped>
img {
    max-width: 75px;
}
</style>
