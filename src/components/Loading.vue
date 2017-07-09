<template>
    <div class="sk-folding-cube" :style="{ width: size + 'px', height: size + 'px' }">
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>
    </div>
</template>

<script>
export default {
    name: 'Loading',

    props: {
        size: {
            type: Number,
            default: 40
        }
    }
};
</script>

<style lang="less" scoped>
@import '../styles/custom.less';

.sk-folding-cube {
    margin: 10rem auto;
    position: relative;
    transform: rotateZ(45deg);
}

.sk-folding-cube .sk-cube {
    float: left;
    width: 50%;
    height: 50%;
    position: relative;
    transform: scale(1.1);
}
.sk-folding-cube .sk-cube:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: @primary-color;
    animation: sk-foldCubeAngle 2.4s infinite linear both;
    transform-origin: 100% 100%;
}
.sk-folding-cube .sk-cube2 {
    transform: scale(1.1) rotateZ(90deg);
}
.sk-folding-cube .sk-cube3 {
    transform: scale(1.1) rotateZ(180deg);
}
.sk-folding-cube .sk-cube4 {
    transform: scale(1.1) rotateZ(270deg);
}
.sk-folding-cube .sk-cube2:before {
    animation-delay: 0.3s;
}
.sk-folding-cube .sk-cube3:before {
    animation-delay: 0.6s;
}
.sk-folding-cube .sk-cube4:before {
    animation-delay: 0.9s;
}
@-webkit-keyframes sk-foldCubeAngle {
  0%, 10% {
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  } 25%, 75% {
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  } 90%, 100% {
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}

@keyframes sk-foldCubeAngle {
  0%, 10% {
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  } 25%, 75% {
    transform: perspective(140px) rotateX(0deg);
    opacity: 1;
  } 90%, 100% {
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}
</style>
