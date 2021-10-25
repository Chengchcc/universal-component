<template>
    <div>
        <a-form-model v-if="type" v-bind="formLayout$$(0)" class="dropdown-form">
            <a-form-model-item v-if="type === 'input'" label="筛选">
                <a-input
                    v-model="filter.keyword"
                    placeholder="搜索 按Enter确认"
                    allow-clear
                    @pressEnter="onConfirm"
                />
            </a-form-model-item>
            <a-form-model-item v-else-if="type === 'date'" label="日期范围">
                <a-range-picker v-model="filter.keyword" v-bind="dateProps" />
            </a-form-model-item>
            <a-form-model-item v-else-if="type === 'select'">
                <a-select v-model="filter.keyword" v-bind="selectProps" />
            </a-form-model-item>
            <div class="dropdown-actions">
                <a-button type="primary" @click="onConfirm">确认</a-button>
                <a-button @click="onReset">重置</a-button>
            </div>
        </a-form-model>
        <div v-else>
            <component
                :is="component"
                :visible="visible"
                :column="column"
                :confirm="confirm"
                :filters="filters"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { omit } from "lodash"
import { Vue, Component, Prop, Watch, Inject } from "vue-property-decorator"
import { FilterOption, TableColFilter, TableColumn } from "../../types/column"
import { warning } from "@/components/universal-form/helper"
import UniversalTable from "../../index.vue"

@Component({})
export default class FilterDropDown extends Vue {
    @Inject({
        default: () => {
            return {}
        }
    })
    useWrapperContext: any

    @Inject({
        default: () => {
            warning("tableContext is not provided")
            return {}
        }
    })
    tableContext: UniversalTable

    @Prop()
    column: TableColumn

    @Prop()
    filters: FilterOption[]

    @Prop()
    visible: boolean

    @Prop()
    confirm: Function

    filter: Partial<FilterOption> = {}

    get component() {
        const scopedSlots = (this.column.filter as TableColFilter).scopedSlots || {}
        const { filterDropdown } = scopedSlots as any
        if (filterDropdown) {
            return FilterDropDown.component("filter-content", {
                functional: true,
                props: {
                    visible: Boolean,
                    filters: Object,
                    confirm: Function,
                    column: Object
                },
                render: (h: any, { props }: any) => {
                    if (this.tableContext.$scopedSlots[filterDropdown]) {
                        return this.tableContext.$scopedSlots[filterDropdown](props)
                    } else {
                        return null
                    }
                }
            })
        } else {
            return null
        }
    }

    get dataIndex() {
        return this.column.dataIndex
    }

    get type() {
        return (this.column.filter as TableColFilter).type
    }

    get curFilter(): Partial<FilterOption> {
        const filter = this.filters.find(sort => sort.dataIndex == this.dataIndex)
        return filter || {}
    }

    get options() {
        const { options = [], optionsDynamic } = this.column.filter as TableColFilter
        if (optionsDynamic) {
            return this.useWrapperContext[optionsDynamic] || []
        } else {
            return options
        }
    }

    get dateProps() {
        const exclude = ["type", "options", "optionsDynamic", "slots", "scopedSlots", "tFilter"]
        const prop = omit(this.column.filter as TableColFilter, exclude)
        const defaultProp = {
            format: "YYYY-MM-DD"
        }
        const ret = Object.assign(defaultProp, prop)
        return ret
    }

    get selectProps() {
        const exclude = ["type", "options", "optionsDynamic", "slots", "scopedSlots", "tFilter"]
        const prop = omit(this.column.filter as TableColFilter, exclude)
        const defaultProp = {
            placeholder: "请选择",
            allowClear: true,
            showArrow: true,
            showSearch: true
        }
        const ret = Object.assign(defaultProp, prop)
        Object.assign(ret, {
            options: this.options
        })
        return ret
    }

    get userSelectProps() {
        const exclude = ["type", "options", "optionsDynamic", "slots", "scopedSlots", "tFilter"]
        const prop = omit(this.column.filter as TableColFilter, exclude)
        const defaultProp = {
            placeholder: "请选择"
        }
        const ret = Object.assign(defaultProp, prop)
        return ret
    }

    get formLayout$$() {
        return (labelWidth: number) => ({
            labelCol: {
                style: { width: labelWidth + "px", float: "left", height: "100%" }
            },
            wrapperCol: {
                style: {
                    width: `calc(100% - ${labelWidth + "px"})`,
                    float: "left",
                    display: "block",
                    height: "100%"
                }
            }
        })
    }

    @Watch("visible", { immediate: true })
    visibleChange(val: boolean) {
        if (val) {
            this.filter = Object.assign({}, this.curFilter)
        }
    }

    keywordIsNull(keyword: any) {
        if (Array.isArray(keyword)) {
            return keyword.length === 0
        } else {
            return !keyword
        }
    }

    onConfirm() {
        if (this.keywordIsNull(this.filter.keyword)) {
            this.filters.splice(
                this.filters.findIndex(q => q.dataIndex === this.dataIndex),
                1
            )
        } else {
            if (!this.curFilter.dataIndex) {
                this.filters.push({
                    ...this.filter,
                    dataIndex: this.dataIndex
                })
            } else {
                this.filters.splice(
                    this.filters.findIndex(q => q.dataIndex === this.dataIndex),
                    1,
                    {
                        ...this.filter,
                        dataIndex: this.dataIndex
                    }
                )
            }
        }

        this.confirm()
    }

    onReset() {
        this.filters.splice(
            this.filters.findIndex(q => q.dataIndex === this.dataIndex),
            1
        )
        this.confirm()
    }
}
</script>

<style lang="scss" scoped>
.dropdown-form {
    padding: 8px 12px;
    ::v-deep .ant-calendar-range-picker-input {
        width: 100px;
    }
    ::v-deep .ant-form-item {
        margin-bottom: 5px;
        .ant-select {
            width: 180px;
        }
    }

    .dropdown-actions {
        display: flex;
        justify-content: space-between;
    }
}
</style>
