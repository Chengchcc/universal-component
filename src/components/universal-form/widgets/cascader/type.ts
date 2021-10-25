import { CommonWidgetProp, FormItemProp } from "../../types/form-item"

export interface CascaderWidgetProp extends CommonWidgetProp {
    options: Array<any>
    // options 绑定wrapper 上下文
    optionsDynamic: string
}

export type CascaderWidgetSchema = FormItemProp<"cascader", CascaderWidgetProp>
