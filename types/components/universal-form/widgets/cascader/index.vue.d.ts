import WidgetBase from "../mixin";
import { CascaderWidgetSchema } from "./type";
declare const CascaderWidget_base: import("vue-class-component/lib/declarations").VueClass<WidgetBase<CascaderWidgetSchema>>;
export default class CascaderWidget extends CascaderWidget_base {
    get options(): any;
    get property(): {
        placeholder: string;
        allowClear: boolean;
        showArrow: boolean;
        showSearch: boolean;
    } & ({
        [key: string]: any;
    } | {});
}
export {};
