import WidgetBase from "../mixin";
import { SelectWidgetSchema } from "./type";
declare const SelectWidget_base: import("vue-class-component/lib/declarations").VueClass<WidgetBase<SelectWidgetSchema>>;
export default class SelectWidget extends SelectWidget_base {
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
