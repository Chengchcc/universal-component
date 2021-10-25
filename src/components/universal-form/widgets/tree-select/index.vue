<template>
    <a-tree-select v-model="value" v-bind="property" v-on="listeners">
        <template v-for="(value, name) in slots" v-slot:[name]>
            <slot :name="value"></slot>
        </template>
        <template v-for="name in treeDataScopeSlots" v-slot:[name]="scope">
            <slot :name="name" v-bind="scope"></slot>
        </template>
        <slot v-if="slots.default" :name="slots.default"></slot>
    </a-tree-select>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator"
import FormItem from "../../form-item.vue"
import WidgetBase from "../mixin"
import { TreeSelectWidgetSchema } from "./type"
@Component({})
export default class TreeSelectWidget extends Mixins<WidgetBase<TreeSelectWidgetSchema>>(
    WidgetBase
) {
    static computeScopdslots = function(schema: TreeSelectWidgetSchema) {
        // @ts-ignore-next-line
        const ctx = this as FormItem
        const { treeData = [], treeDataDynamic } = schema.property || {}
        let data = []
        if (treeDataDynamic) {
            data = ctx.useWrapperContext[treeDataDynamic] || []
        } else {
            data = treeData
        }
        const slots: any[] = []
        const handle = (data: any[]) => {
            data.forEach(node => {
                if (node.children && node.children.length) {
                    handle(node.children)
                }
                if (node.scopedSlots) {
                    slots.push(node.scopedSlots)
                }
            })
        }
        handle(data)
        const ret = slots.map(t => Object.values(t)).flat()
        return [...new Set(ret)] as string[]
    }

    get treeData(): any[] {
        const { treeData = [], treeDataDynamic } = this.schema.property
        if (treeDataDynamic) {
            return this.useWrapperContext[treeDataDynamic] || []
        } else {
            return treeData
        }
    }

    get property() {
        const { treeData, treeDataDynamic, ...prop } = this.schema.property || {}
        const defaultProp = {
            placeholder: "请选择",
            allowClear: true,
            showArrow: true,
            showSearch: true
        }
        const ret = Object.assign(defaultProp, prop)
        if (!Object.keys(this.slots).includes("default")) {
            Object.assign(ret, {
                treeData: this.treeData
            })
        }
        return ret
    }

    get treeDataScopeSlots(): string[] {
        const treeData = this.treeData
        const slots: any[] = []
        const handle = (data: any[]) => {
            data.forEach(node => {
                if (node.children && node.children.length) {
                    handle(node.children)
                }
                if (node.scopedSlots) {
                    slots.push(node.scopedSlots)
                }
            })
        }
        handle(treeData)
        const ret = slots.map(t => Object.values(t)).flat()
        return [...new Set(ret)] as string[]
    }
}
</script>

<style scoped></style>
