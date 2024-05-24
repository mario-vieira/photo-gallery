<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name: "Input",
    emits: ['update'],
    props: {
        id: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 256
        }
    },
    methods: {
        handleChange(event:any) {
            if (this.disabled) {
                return;
            }
            this.$emit('update', event.target.value);
        }
    }
})
</script>

<template>
    <input
        :id="id"
        :name="name"
        :value="value"
        @input="handleChange($event)"
        :placeholder="placeholder"
        :type="type"
        :disabled="disabled"
        :required="required"
    >
</template>

<style scoped lang="scss">
    input {
        opacity: 1;
        font-weight: 400;
        letter-spacing: 0;
        text-align: left;
        line-height: 20px;
        font-size: 14px;
        padding: 9px 12px;
        border: 1px solid lightslategray;
        border-radius: 4px;
        min-width: 315px;
    }
    input:hover {
        border-color: gray;
    }
    input:disabled {
        background-color: lightgray;
    }
    input:focus {
        border-color: purple;
        outline: none;
        box-shadow: 0 0 0 2pt mediumpurple;
    }
    input:invalid {
        border-color: red;
    }
    input:invalid:focus {
        border-color: red;
        outline: none;
        box-shadow: 0 0 0 2pt indianred;
    }
</style>