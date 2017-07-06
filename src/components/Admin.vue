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
    padding: 0.5rem;

    overflow: hidden;
    min-width: 960px;

    .left {
        width: 360px;
        float: left;
    }

    .right {
        margin-left: 360px;
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
