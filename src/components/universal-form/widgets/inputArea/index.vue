<template>
    <a-textarea v-model="value" v-bind="property" v-on="listeners">
        <template v-for="(value, name) in slots" v-slot:[name]>
            <slot :name="value"></slot>
        </template>
        <template v-for="(value, name) in scopedSlots" v-slot:[name]="scopeData">
            <slot :name="value" v-bind="scopeData"></slot>
        </template>
    </a-textarea>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator"
import WidgetBase from "../mixin"
import { InputWidgetSchema } from "../input/type"
@Component({})
export default class InputAreaWidget extends Mixins<WidgetBase<InputWidgetSchema>>(WidgetBase) {
    get property() {
        const prop = this.schema.property || {}
        const defaultProp = {
            placeholder: "请填写",
            allowClear: true,
            rows: 3
        }
        return Object.assign(defaultProp, prop)
    }
}
</script>

<style scoped></style>
