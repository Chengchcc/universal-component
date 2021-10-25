<template>
    <div>
        <div class="table-header">
            <div class="table-header--panel">
                <slot name="table-search">
                    <a-input-search
                        v-model="keyword"
                        style="max-width: 300px; height:32px"
                        placeholder="输入 按Enter搜索"
                        allow-clear
                        @search="onSearch"
                        @change="onSearchChange"
                    />
                    <filter-panel style="display: inline-flex" />
                </slot>
            </div>
            <div class="table-header--extra">
                <col-setting />
            </div>
        </div>
        <slot name="table-sub-header"></slot>
        <a-table
            v-ant-ref="c => (refTable = c)"
            :columns="innerColumns"
            :data-source="dataSource"
            :loading="loading"
            :components="components"
            :pagination="pagination"
            size="middle"
            :scroll="{ x: '100%', y: `${maxHeight}px` }"
            v-bind="vBinds"
            v-on="$listeners"
        >
            <template #tableExtra>
                <col-setting />
            </template>
            <filter-dropdown
                slot="filterDropdown"
                slot-scope="scope"
                :filters="filters"
                :column="scope.column"
                :visible="scope.visible"
                :confirm="
                    () => {
                        onFilterConfirm(scope)
                    }
                "
            />
            <a-icon
                slot="filterIcon"
                slot-scope="filtered"
                type="search"
                :style="{ color: filtered ? '#108ee9' : undefined }"
            />
            <template v-for="name in columnSlots" v-slot:[name]="scope">
                <slot :name="name" v-bind="scope"></slot>
            </template>
            <template #actions="record, idx">
                <actions-panel
                    :record="record"
                    :actions="customActions(record, idx)"
                    @dispatch="
                        e => {
                            $emit('dispatch', { event: e, payload: record })
                        }
                    "
                />
            </template>
        </a-table>
        <div class="table-footer">
            <div class="table-footer--left">
                <slot name="table-footer-left">
                    <span>共{{ pagination.total }}条结果</span>
                </slot>
            </div>
            <div class="table-footer-right">
                <a-pagination
                    v-bind="vPaginationBinds"
                    @change="pagination.onChange"
                    @showSizeChange="pagination.onShowSizeChange"
                />
            </div>
        </div>
    </div>
</template>

<script lang="tsx">
import Vue from "vue"
import { Component, Provide, Prop, Mixins, Watch, Inject } from "vue-property-decorator"
import { FilterOption, SortOption, TableColumn } from "./types/column"
import PaginationHelper from "./paginationHelper"
import { Table } from "ant-design-vue"
import { omit, pick } from "lodash"
import { catchErrorMsg, loadingStateMsg } from "@/decorators"
import { warning } from "../universal-form/helper"
import FilterDropdown from "./components/filter-dropdown/index.vue"
import FilterPanel from "./components/filter-panel/index.vue"
import ColSetting from "./components/col-setting/index.vue"
import ActionsPanel from "./components/actions-panel/index.vue"
import customTitle from "./customHeader"
import customRender, { renderMap } from "./customRender"
import { getValFromStorage, setValToStorage, sum } from "./helper"
//@ts-ignore-next-line
import VueDraggableResizable from "vue-draggable-resizable"
import { ColumnAction } from "./types/action"
Vue.component("vue-draggable-resizable", VueDraggableResizable)

const props = Object.assign({}, (Table as any)?.props)
;["pagination", "loading", "columns", "dataSource", "components"].map(t => {
    delete props[t]
})

@Component({
    name: "IUniversalTable",
    props: props,
    components: {
        FilterDropdown,
        FilterPanel,
        ColSetting,
        ActionsPanel
    }
})
export default class IUniversalTable extends Mixins(PaginationHelper) {
    static ActionsPanel = ActionsPanel

    static ColumnPresets: Record<string, TableColumn> = {}

    static registerCustomReneder(name: string, render: Function) {
        if (renderMap[name]) {
            warning(`function:[${name}] is already registered`)
        }
        renderMap[name] = render
    }

    static registerPreset(name: string, column: TableColumn) {
        if (IUniversalTable.ColumnPresets[name]) {
            warning(`preset:[${name}] is already registered`)
        }
        IUniversalTable.ColumnPresets[name] = column
    }

    static getPresetColumn(column: TableColumn) {
        return Object.assign({}, IUniversalTable.ColumnPresets[column.preset], column)
    }

    static getPresetColumnProp(column: TableColumn, prop: string) {
        const column_ = Object.assign(
            {},
            IUniversalTable.ColumnPresets[column.preset],
            column
        ) as any
        return column_[prop]
    }

    refTable: Table

    @Provide()
    get tableContext() {
        return this
    }

    @Inject({
        default: () => {
            return {}
        }
    })
    useWrapperContext: any

    @Prop()
    columns: TableColumn[]

    @Prop({ required: true })
    tableName: string

    @Prop({ default: 570 })
    maxHeight: number

    @Prop()
    customActions: (record: any, idx: number) => ColumnAction[]

    @Prop({ default: true })
    showActions: boolean

    @Prop()
    handleSearch: (
        keyword: string,
        pagination: any,
        sorts: SortOption[],
        filters: FilterOption[]
    ) => Promise<{ total: number; list: any }>

    dataSource: any = []

    sorts: SortOption[] = []

    filters: FilterOption[] = []

    keyword = ""

    loading = false

    colSetting: Record<string, { visible: number; width: number }> = {}

    // 非响应数据防止 拖拽时innerColumn计算多遍
    colsWidth: Record<string, number>

    get vBinds() {
        const props = this.$props
        const exclude = [
            "columns",
            "pagination",
            "loading",
            "dataSource",
            "customActions",
            "tableName",
            "maxHeight"
        ]
        const ret = omit(props, exclude)
        return ret
    }

    get vPaginationBinds() {
        const exlcude = ["limit", "offset", "showTotal", "onChange", "onShowSizeChange"]
        return omit(this.pagination, exlcude)
    }

    get columnSlots() {
        const slotsMap = {}
        this.columns.forEach(col => {
            const { slots, scopedSlots } = col
            Object.assign(slotsMap, scopedSlots)
            Object.assign(slotsMap, slots)
        })
        return slotsMap
    }

    get innerColumns(): TableColumn[] {
        const outer = this.columns.filter(t => this.colSetting[t.dataIndex].visible)
        const columns: TableColumn[] = outer
            .map(item_ => {
                const item = IUniversalTable.getPresetColumn(item_)
                const { filter, sort, dataIndex } = item
                const col: TableColumn = {
                    ...item,
                    // 非响应数据
                    width: this.colsWidth[dataIndex] || item.width || 150,
                    customHeaderCell: () => {
                        return {
                            class: {
                                "ant-table-column-custom": true
                            }
                        } as any
                    }
                }

                // 挂载 title
                col.title = customTitle(this, col, item)

                // 挂载 customRender
                customRender(this, col, item)

                if (sort) {
                    // 排序
                    const sortOp = this.sorts.find(q => q.dataIndex === dataIndex)
                    let sortOrder: any = false
                    if (sortOp !== undefined) {
                        sortOrder = sortOp.is_ascend ? "ascend" : "descend"
                    }
                    Object.assign(col, {
                        sort: {
                            order: sortOrder
                        }
                    })
                }

                if (filter) {
                    Object.assign(col, {
                        filtered: !!this.filters.find(q => q.dataIndex === dataIndex),
                        filterDropdownVisible: false,
                        scopedSlots: {
                            ...item.scopedSlots,
                            filterDropdown: "filterDropdown"
                        },
                        filterIcon: () => {
                            return (
                                <a-icon
                                    type="search"
                                    class="filter-search"
                                    onClick={() => {
                                        col.filterDropdownVisible = !col.filterDropdownVisible
                                        this.refTable.$forceUpdate()
                                    }}
                                />
                            )
                        }
                    })
                }

                return col
            })
            .concat(
                this.showActions
                    ? [
                          {
                              key: "actions",
                              title: "操作",
                              fixed: "right",
                              width: 200,
                              scopedSlots: { customRender: "actions" }
                          }
                      ]
                    : []
            )
        this.resizeColumns(columns)
        return columns
    }

    onFilterConfirm(scope: any) {
        const col = this.columns.find(col => col.dataIndex == scope.column.dataIndex)
        col.filterDropdownVisible = false
        this.refTable.$forceUpdate()
    }

    dragging: boolean
    get components() {
        const ResizeableTitle = ({ props, children, listeners, ...other }: any) => {
            const { key, ...restprops } = props
            const columns = this.innerColumns
            const col = columns.find((col: any) => {
                const k = col.dataIndex
                return k === key
            })

            const originClass = other.data.class || ""
            if (!col || !col.width) {
                return (
                    <th {...props} class={originClass}>
                        {children}
                    </th>
                )
            }
            const colWidth = col.width ? parseInt(String(col.width)) : 0

            const onDrag = (x: any) => {
                this.dragging = true
                // 更新column width

                col.width = x
                this.resizeColumns(columns)

                // // 记录resize后的每个column的width
                columns.forEach(col => {
                    if (col.dataIndex) {
                        this.colsWidth[col.dataIndex] = Number(col.width)
                        this.colSetting[col.dataIndex].width = Number(col.width)
                    }
                })

                this.saveColSetting()

                // 强制table刷新
                this.refTable.$forceUpdate()
            }

            const onDragstop = () => {
                setTimeout(() => {
                    this.dragging = false
                }, 2e2)
            }

            return (
                <th
                    {...restprops}
                    width={colWidth}
                    class={originClass + " resize-table-th"}
                    style={col.align ? `text-align: ${col.align}` : ""}
                >
                    {children}
                    <vue-draggable-resizable
                        key={col.key}
                        class="table-draggable-handle"
                        axis="x"
                        w={10}
                        x={colWidth}
                        z={1}
                        draggable={true}
                        resizable={false}
                        onDragging={onDrag}
                        onDragstop={onDragstop}
                    />
                </th>
            )
        }
        return {
            header: {
                cell: ResizeableTitle
            }
        }
    }

    get storageKey() {
        return `form_${this.tableName}_setting`
    }

    @Watch("filters", { deep: true })
    onFiltersChange() {
        this.pagination.current = 1
        this.onSearch()
    }

    @Watch("sorts", { deep: true })
    onSortsChange() {
        this.pagination.current = 1
        this.onSearch()
    }

    @Watch("columns", { immediate: true })
    getColSettingFromStorage() {
        const keys = this.columns.map(t => t.dataIndex)
        const obj = getValFromStorage(this.storageKey)
        const colSetting = keys.reduce((next, key) => {
            next[key] = {
                visible: 1,
                width: 0
            }
            return next
        }, {} as Record<string, { visible: number; width: number }>)
        const pickObj = pick(obj, keys)
        Object.assign(colSetting, pickObj)
        this.colsWidth = Object.fromEntries(
            Object.entries(colSetting).map(([k, v]) => [k, v.width])
        )
        this.colSetting = colSetting
    }

    resetColSetting() {
        const keys = this.columns.map(t => t.dataIndex)
        const colSetting = keys.reduce((next, key) => {
            next[key] = {
                visible: 1,
                width: 0
            }
            return next
        }, {} as any)
        this.colSetting = colSetting
    }

    setColSetting(colSetting: Record<string, { visible: number; width: number }>) {
        this.colSetting = colSetting
    }

    @Watch("colSetting", { deep: true })
    saveColSetting() {
        this.colsWidth = Object.fromEntries(
            Object.entries(this.colSetting).map(([k, v]) => [k, v.width])
        )
        setValToStorage(this.storageKey, this.colSetting)
    }

    // resize column的width以适应整个table
    resizeColumns(columns: TableColumn[]) {
        const fixedWidth = this.fixedWidth - 60

        let needResize = true
        const totalWidth = sum(
            ...columns.map((col: any) => {
                if (!col.width) needResize = false
                return parseInt(col.width)
            })
        )
        if (fixedWidth > totalWidth && columns.length && needResize) {
            columns.forEach(t => {
                t.width = Math.floor((Number(t.width) / totalWidth) * fixedWidth)
            })
        }
    }

    onSortChange(sorters: any) {
        const { dataIndex, order } = sorters
        const sortDirections = ["ascend", "descend"]
        const methodIndex = sortDirections.indexOf(order) + 1
        const newSortOrder =
            methodIndex === sortDirections.length ? false : sortDirections[methodIndex]
        const sortIdx = this.sorts.findIndex(item => item.dataIndex === dataIndex)
        const sort = this.sorts[sortIdx]
        if (sort && newSortOrder) {
            sort.is_ascend = newSortOrder == "ascend" ? 1 : 0
        } else if (sort && !newSortOrder) {
            this.sorts.splice(sortIdx, 1)
        } else {
            this.sorts.push({
                dataIndex: dataIndex,
                is_ascend: newSortOrder == "ascend" ? 1 : 0
            })
        }
    }

    onSearchChange(e: any) {
        if (!e.target.value) {
            this.onSearch()
        }
    }

    fixedWidth = 0

    calcFixedWidth() {
        this.fixedWidth = this.$el?.clientWidth
    }

    mounted() {
        this.calcFixedWidth()
        this.onSearch()
    }

    @loadingStateMsg({ loadingProp: "loading" })
    @catchErrorMsg({ prefix: "请求失败" })
    async onSearch() {
        const { total, list } = await this.handleSearch(
            this.keyword,
            this.pagination,
            this.sorts,
            this.filters
        )
        this.pagination.total = total
        this.dataSource = list
    }
}

IUniversalTable.registerPreset("date", {
    title: "时间",
    dataIndex: "time",
    filter: {
        type: "date",
        format: "YYYY-MM-DD"
    },
    renderType: "date",
    renderProps: {
        format: "YYYY-MM-DD HH:mm:ss"
    },
    width: 180
})
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
