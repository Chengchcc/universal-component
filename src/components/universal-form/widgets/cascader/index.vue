<template>
    <a-cascader v-model="value" :options="options" v-bind="property" v-on="listeners">
        <template v-for="(value, name) in slots" v-slot:[name]>
            <slot :name="value"></slot>
        </template>
    </a-cascader>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator"
import WidgetBase from "../mixin"
import { CascaderWidgetSchema } from "./type"
@Component({})
export default class CascaderWidget extends Mixins<WidgetBase<CascaderWidgetSchema>>(WidgetBase) {
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
        return Object.assign(defaultProp, prop)
    }
}
</script>

<style scoped></style>
