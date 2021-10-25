<template>
    <a-radio-group v-model="value" v-bind="property" v-on="listeners">
        <a-radio-button v-for="op in options" :key="op.value" :value="op.value">
            {{ op.label }}
        </a-radio-button>
    </a-radio-group>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator"
import WidgetBase from "../mixin"
import { RadioGroupWidgetSchema } from "./type"
@Component({})
export default class RadioGroupWidget extends Mixins<WidgetBase<RadioGroupWidgetSchema>>(
    WidgetBase
) {
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
            buttonStyle: "solid"
        }
        return Object.assign(defaultProp, prop)
    }
}
</script>

<style scoped></style>
