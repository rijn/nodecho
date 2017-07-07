<template>
    <span class="input input--minoru">
        <input
            ref="input"
            class="input__field input__field--minoru"
            :type="type"
            :name="name"
            :value="currentValue"
            :autofocus="autofocus"
            @keyup.enter="handleEnter"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="handleInput"
            @change="handleChange">
        <label class="input__label input__label--minoru">
            <span class="input__label-content input__label-content--minoru">{{ placeholder }}</span>
        </label>
    </span>
</template>

<script>
export default {
    name: 'input',
    props: {
        type: {
            type: String,
            default: 'text'
        },
        value: {
            type: [String, Number],
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        name: {
            type: String
        },
        autofocus: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            currentValue: this.value
        };
    },
    methods: {
        handleEnter (event) {
            this.$emit('on-enter', event);
        },
        handleFocus (event) {
            this.$emit('on-focus', event);
        },
        handleBlur (event) {
            this.$emit('on-blur', event);
        },
        handleInput (event) {
            let value = event.target.value;
            if (this.number) value = Number.isNaN(Number(value)) ? value : Number(value);
            this.$emit('input', value);
            this.setCurrentValue(value);
            this.$emit('on-change', event);
        },
        handleChange (event) {
            this.$emit('on-input-change', event);
        },
        focus () {
            this.$refs.input.focus();
        },
        setCurrentValue (value) {
            this.currentValue = value;
        }
    },
    watch: {
        value (val) {
            this.setCurrentValue(val);
        }
    }
};
</script>

<style lang="less" scoped>
@import '../styles/custom.less';

.input {
    position: relative;
    z-index: 1;
    display: inline-block;
    max-width: 350px;
    width: 100%;
    vertical-align: top;
}

.input__field {
    position: relative;
    display: block;
    float: right;
    padding: 0.8em;
    width: 60%;
    border: none;
    border-radius: 0;
    background: #f0f0f0;
    color: #aaa;
    font-weight: bold;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    -webkit-appearance: none; /* for box shadows to show on iOS */
}

.input__field:focus {
    outline: none;
}

.input__label {
    display: inline-block;
    float: right;
    padding: 0 1em;
    width: 40%;
    color: #6a7989;
    font-weight: bold;
    font-size: 70.25%;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.input__label-content {
    position: relative;
    display: block;
    padding: 1.6em 0;
    width: 100%;
}

.graphic {
    position: absolute;
    top: 0;
    left: 0;
    fill: none;
}

/* Minoru */
.input__field--minoru {
    width: 100%;
    background: @background-color-base;
    box-shadow: 0px 0px 0px 2px transparent;
    color: @primary-color;
    transition: box-shadow 0.3s, background 0.3s;
}

.input__label--minoru {
    padding: 0;
    width: 100%;
    text-align: left;
}

.input__label--minoru::after {
    content: '';
    position: absolute;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 4em;
    box-shadow: 0px 0px 0px 0px;
    color: fade(@primary-color, 50%);
}

.input__field--minoru:focus {
    background: #fff;
    box-shadow: 0px 0px 0px 2px @primary-color;
}

.input__field--minoru:focus + .input__label--minoru {
    pointer-events: none;
}

.input__field--minoru:focus + .input__label--minoru::after {
    animation: anim-shadow 0.3s forwards;
}

@-webkit-keyframes anim-shadow {
    to {
        box-shadow: 0px 0px 100px 50px;
        opacity: 0;
    }
}

@keyframes anim-shadow {
    to {
        box-shadow: 0px 0px 100px 50px;
        opacity: 0;
    }
}

.input__label-content--minoru {
    padding: 0.35em 0.15em;
}

</style>
