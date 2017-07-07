<template>
    <div class="container">
        <div class="left">
            <div class="auth panel">
                <auth></auth>
            </div>
            <div class="navi panel">
                <ul>
                    <li><router-link :to="{ name: 'AdminHome' }"><a>Home</a></router-link></li>
                    <li><router-link :to="{ name: 'AdminPost' }"><a>Post</a></router-link></li>
                    <li><router-link :to="{ name: 'AdminEdit', params: { id: 'new' } }"><a>New</a></router-link></li>
                </ul>
            </div>
        </div>
        <div class="right">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Auth from './Auth';

export default {
    name: 'Admin',

    components: { Auth }
};
</script>

<style lang="less" scoped>
.container {
    padding: 0.5rem 0;

    position: relative;

    overflow: hidden;
    width: 1000px;

    margin: 0 auto;

    .left {
        width: 300px;
        float: left;
    }

    .right {
        float: left;
        width: 700px;
        // padding-left: 360px;
        z-index: 10;
    }
}

.panel {
    padding: 0.5rem;
    margin: 0.5rem 0.5rem 1rem 0.5rem;
    background: #fff;
}

.navi {
    li {
        a {
            display: block;
            padding: 0.4rem;
        }
    }
}
</style>
