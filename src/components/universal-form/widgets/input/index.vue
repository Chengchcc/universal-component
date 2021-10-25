<template>
    <a-input v-model="value" v-bind="property" v-on="listeners">
        <template v-for="(value, name) in slots" v-slot:[name]>
            <slot :name="value"></slot>
        </template>
    </a-input>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator"
import WidgetBase from "../mixin"
import { InputWidgetSchema } from "./type"
@Component({})
export default class InputWidget extends Mixins<WidgetBase<InputWidgetSchema>>(WidgetBase) {
    get property() {
        const prop = this.schema.property || {}
        const defaultProp = {
            placeholder: "请填写",
            allowClear: true
        }
        return Object.assign(defaultProp, prop)
    }
}
</script>

<style scoped></style>
