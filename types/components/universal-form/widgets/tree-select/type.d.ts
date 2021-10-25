import { CommonWidgetProp, FormItemProp } from "../../types/form-item";
export interface TreeSelectWidgetProp extends CommonWidgetProp {
    treeData: any;
    treeDataDynamic: string;
}
export declare type TreeSelectWidgetSchema = FormItemProp<"tree-select", TreeSelectWidgetProp>;
