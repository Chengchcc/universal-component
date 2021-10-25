import WidgetBase from "../mixin";
import { TreeSelectWidgetSchema } from "./type";
declare const TreeSelectWidget_base: import("vue-class-component/lib/declarations").VueClass<WidgetBase<TreeSelectWidgetSchema>>;
export default class TreeSelectWidget extends TreeSelectWidget_base {
    static computeScopdslots: (schema: TreeSelectWidgetSchema) => string[];
    get treeData(): any[];
    get property(): {
        placeholder: string;
        allowClear: boolean;
        showArrow: boolean;
        showSearch: boolean;
    } & ({
        [key: string]: any;
    } | {});
    get treeDataScopeSlots(): string[];
}
export {};
