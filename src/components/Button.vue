<template>
    <button :class="classes" :disabled="disabled" @click="handleClick">
        <span v-if="showSlot" ref="slot"><slot></slot></span>
    </button>
</template>

<script>
    const prefixCls = 'ne-btn';

    export default {
        name: 'Button',
        props: {
            type: String,
            disabled: Boolean,
            long: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                showSlot: true
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-${this.type}`]: !!this.type,
                        [`${prefixCls}-long`]: this.long
                    }
                ];
            }
        },
        methods: {
            handleClick (event) {
                this.$emit('click', event);
            }
        },
        mounted () {
            this.showSlot = this.$slots.default !== undefined;
        }
    };
</script>

<style lang="less" scoped>
@import '../styles/index.less';

.button-size(@padding; @font-size; @border-radius) {
    padding: @padding;
    font-size: @font-size;
    border-radius: @border-radius;
}

.button-color(@color; @background; @border) {
    color: @color;
    background-color: @background;
    border-color: @border;
    > a:only-child {
        color: currentColor;
        &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: transparent;
        }
    }
}

.button-variant(@color; @background; @border) {
    .button-color(@color; @background; @border);

    &:hover
    {
        .button-color(tint(@color, 20%); tint(@background, 20%); tint(@border, 20%));
    }
    &:active,
    &.active {
        .button-color(shade(@color, 5%); shade(@background, 5%); shade(@background, 5%));
    }

    &.disabled,
    &[disabled],
    fieldset[disabled] & {
        &,
        &:hover,
        &:focus,
        &:active,
        &.active {
            .button-color(@btn-disable-color; @btn-disable-bg; @btn-disable-border);
        }
    }
}

.btn() {
    display: inline-block;
    margin-bottom: 0;
    font-weight: @btn-font-weight;
    text-align: center;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    line-height: @line-height-base;
    user-select: none;
    .button-size(@btn-padding-base; @btn-font-size; @btn-border-radius);
    transition: color @transition-time linear, background-color @transition-time linear, border @transition-time linear;

    &,
    &:active,
    &:focus {
        outline: 0;
    }

    &:not([disabled]):hover {
        text-decoration: none;
    }

    &:not([disabled]):active {
        outline: 0;
        transition: none;
    }

    &.disabled,
    &[disabled] {
        cursor: @cursor-disabled;
        > * {
            pointer-events: none;
        }
    }
}

.btn-default() {
    .button-variant(@btn-default-color; @btn-default-bg; @btn-default-border);

    &:hover
    {
        .button-color(tint(@primary-color, 20%); white; tint(@primary-color, 20%));
    }
    &:active,
    &.active {
        .button-color(shade(@primary-color, 5%); white; shade(@primary-color, 5%));
    }
}

.btn-primary() {
    .button-variant(@btn-primary-color; @btn-primary-bg; @primary-color);

    &:hover,
    &:active,
    &.active {
        color: @btn-primary-color;
    }
}

@btn-prefix-cls: ~"ne-btn";

.@{btn-prefix-cls} {
    .btn;
    .btn-default;

    &-long{
        width: 100%;
    }

    &-primary {
        .btn-primary;
    }

    &:before {
        position: absolute;
        top: -1px;
        left: -1px;
        bottom: -1px;
        right: -1px;
        background: #fff;
        opacity: 0.35;
        content: '';
        border-radius: inherit;
        z-index: 1;
        transition: opacity @transition-time;
        pointer-events: none;
        display: none;
    }
}
</style>
