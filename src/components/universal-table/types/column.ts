import { AntdComponent } from "ant-design-vue/types/component"
import { Column } from "ant-design-vue/types/table/column"
export interface TableColSort {
    order?: "ascend" | "descend"
}

export interface TableColFilter {
    type?: "input" | "date" | "select" | "user"
    options?: Array<any>
    optionsDynamic?: string
    // slots: { filterIcon: 'XXX'}
    slots?: Record<string, string>
    // scopedSlots: { filterDropdown: 'XXX'}
    scopedSlots?: Record<string, string>
    // 过滤项展示时
    tFilter?: Function
    // 其他字段
    [other: string]: any
}

export interface TableColumn extends Omit<Column, keyof AntdComponent | "title"> {
    // 排序
    sort?: TableColSort | false

    // 筛选
    filter?: TableColFilter | false

    title?: any

    // 预设好的column
    preset?: string

    // 常见的一些类型
    renderType?: string

    // 渲染需要的参数
    renderProps?: {
        // 无数据时展示--
        renderNoData?: boolean
        // select需要
        options?: Array<any>
        optionsDynamic?: string
        // date需要
        format?: string
    }
}

export interface SortOption {
    dataIndex: string
    // 是否正序
    is_ascend: 0 | 1
}

export interface FilterOption {
    dataIndex: string
    // 关键字
    keyword?: any
}
