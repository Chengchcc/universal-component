<template>
    <a-range-picker v-model="value" v-bind="property" v-on="listeners" />
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator"
import WidgetBase from "../mixin"
import { DateRangeWidgetSchema } from "./type"
@Component({})
export default class DateRangeWidget extends Mixins<WidgetBase<DateRangeWidgetSchema>>(WidgetBase) {
    get property() {
        const props = this.schema.property || {}
        const defaultProp = {
            format: "YYYY-MM-DD",
            valueFormat: "YYYY-MM-DD"
        }
        return Object.assign(defaultProp, props)
    }
}
</script>

<style scoped></style>
