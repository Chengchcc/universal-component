<template>
    <div class="filter-panel">
        <!-- 排序 -->
        <template v-for="sort in sorts">
            <a-tag
                :key="sort.dataIndex"
                closable
                @close.prevent="delSort(sort.dataIndex)"
                @click="delSort(sort.dataIndex)"
            >
                {{ columnGetter(sort.dataIndex).title }} :
                {{ sort.is_ascend ? "升序" : "降序" }}
            </a-tag>
        </template>
        <template v-for="filter in filters">
            <a-tag
                :key="filter.dataIndex"
                closable
                @close.prevent="delFilter(filter.dataIndex)"
                @click="delFilter(filter.dataIndex)"
            >
                {{ columnGetter(filter.dataIndex).title }} :
                {{ tTagFilter(filter.dataIndex)(filter.keyword) }}
            </a-tag>
        </template>
    </div>
</template>

<script lang="ts">
import { warning } from "@/components/universal-form/helper"
import { Vue, Component, Inject } from "vue-property-decorator"
import { tDate } from "../../helper"
import UniversalTable from "../../index.vue"
import { TableColFilter } from "../../types/column"

@Component({})
export default class FilterPanel extends Vue {
    @Inject({
        default: () => {
            warning("tableContext is not provided")
            return {}
        }
    })
    tableContext: UniversalTable

    @Inject({
        default: () => {
            return {}
        }
    })
    useWrapperContext: any

    get filters() {
        return this.tableContext.filters
    }

    get sorts() {
        return this.tableContext.sorts
    }

    get columns() {
        return this.tableContext.columns || []
    }

    get columnGetter() {
        return (dataIndex: string) => {
            const col = this.columns.find(t => t.dataIndex === dataIndex) ?? {}
            return UniversalTable.getPresetColumn(col)
        }
    }

    get tTagFilter() {
        return (dataIndex: string) => {
            const col = this.columnGetter(dataIndex)
            const filter = col.filter as TableColFilter
            const tTag = filter?.tFilter
            if (tTag) {
                return tTag
            } else if (filter.type == "date") {
                const fmt = filter.format || "YYYY-MM-DD"
                return (text: any[]) => text.map(t => tDate(t, fmt)).join("~")
            } else if (filter.type == "select") {
                const { options = [], optionsDynamic } = filter || {}
                let map: any[] = options
                if (optionsDynamic) {
                    map = this.useWrapperContext[optionsDynamic] || options || []
                }
                return (text: any) => {
                    return [text]
                        .flat()
                        .filter(Boolean)
                        .map(ele => {
                            return map.find(t => t.value == ele)?.label || ele
                        })
                        .join(" | ")
                }
            } else {
                return (text: any) => text
            }
        }
    }

    delSort(dataIndex: string) {
        this.sorts.splice(
            this.sorts.findIndex(s => s.dataIndex == dataIndex),
            1
        )
    }

    delFilter(dataIndex: string) {
        this.filters.splice(
            this.filters.findIndex(s => s.dataIndex == dataIndex),
            1
        )
    }
}
</script>

<style lang="scss" scoped>
.filter-panel {
    display: flex;
    margin: 0 4px;
    flex: 1 0;
    flex-wrap: wrap;
    ::v-deep .ant-tag {
        margin: 4px;
        display: inline-flex;
        align-items: center;
        span {
            display: inline-block;
            max-width: 200px;
            @include ellipsis();
            line-height: 20px;
        }
    }
}
</style>
