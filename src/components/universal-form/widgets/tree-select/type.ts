import { CommonWidgetProp, FormItemProp } from "../../types/form-item"

export interface TreeSelectWidgetProp extends CommonWidgetProp {
    treeData: any

    treeDataDynamic: string
}

export type TreeSelectWidgetSchema = FormItemProp<"tree-select", TreeSelectWidgetProp>
