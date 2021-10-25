<template>
    <a-select v-model="value" v-bind="property" v-on="listeners">
        <template v-for="(value, name) in slots" v-slot:[name]>
            <slot :name="value"></slot>
        </template>
        <slot v-if="scopedSlots.default" :name="scopedSlots.default"></slot>
    </a-select>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator"
import WidgetBase from "../mixin"
import { SelectWidgetSchema } from "./type"
@Component({})
export default class SelectWidget extends Mixins<WidgetBase<SelectWidgetSchema>>(WidgetBase) {
    get options() {
        const { options = [], optionsDynamic } = this.schema.property
        if (optionsDynamic) {
            return this.useWrapperContext[optionsDynamic] || []
        } else {
            return options
        }
    }

    get property() {
        const { options, optionsDynamic, ...prop } = this.schema.property || {}
        const defaultProp = {
            placeholder: "请选择",
            allowClear: true,
            showArrow: true,
            showSearch: true
        }
        const ret = Object.assign(defaultProp, prop)
        if (!Object.keys(this.scopedSlots).includes("default")) {
            Object.assign(ret, {
                options: this.options
            })
        }
        return ret
    }
}
</script>

<style scoped></style>
