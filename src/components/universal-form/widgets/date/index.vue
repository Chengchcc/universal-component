<template>
    <a-date-picker v-model="value" v-bind="property" v-on="listeners" />
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator"
import WidgetBase from "../mixin"
import { DateWidgetSchema } from "./type"
@Component({})
export default class DateWidget extends Mixins<WidgetBase<DateWidgetSchema>>(WidgetBase) {
    get property() {
        const props = this.schema.property
        const defaultProps = {
            format: "YYYY-MM-DD",
            valueFormat: "YYYY-MM-DD"
        }
        return Object.assign(defaultProps, props)
    }
}
</script>

<style lang="scss" scoped>
.ant-calendar-picker {
    width: 100%;
}
</style>
