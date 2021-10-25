import { CommonWidgetProp, FormItemProp } from "../../types/form-item";
export interface SelectWidgetProp extends CommonWidgetProp {
    options: Array<any>;
    optionsDynamic: string;
}
export declare type SelectWidgetSchema = FormItemProp<"select", SelectWidgetProp>;
