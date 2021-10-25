import { AntdComponent } from "ant-design-vue/types/component";
import { Column } from "ant-design-vue/types/table/column";
export interface TableColSort {
    order?: "ascend" | "descend";
}
export interface TableColFilter {
    type?: "input" | "date" | "select" | "user";
    options?: Array<any>;
    optionsDynamic?: string;
    slots?: Record<string, string>;
    scopedSlots?: Record<string, string>;
    tFilter?: Function;
    [other: string]: any;
}
export interface TableColumn extends Omit<Column, keyof AntdComponent | "title"> {
    sort?: TableColSort | false;
    filter?: TableColFilter | false;
    title?: any;
    preset?: string;
    renderType?: string;
    renderProps?: {
        renderNoData?: boolean;
        options?: Array<any>;
        optionsDynamic?: string;
        format?: string;
    };
}
export interface SortOption {
    dataIndex: string;
    is_ascend: 0 | 1;
}
export interface FilterOption {
    dataIndex: string;
    keyword?: any;
}
