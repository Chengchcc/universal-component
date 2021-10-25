import { CommonWidgetProp, FormItemProp } from "../../types/form-item";
export interface CascaderWidgetProp extends CommonWidgetProp {
    options: Array<any>;
    optionsDynamic: string;
}
export declare type CascaderWidgetSchema = FormItemProp<"cascader", CascaderWidgetProp>;
