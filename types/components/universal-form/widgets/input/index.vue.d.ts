import WidgetBase from "../mixin";
import { InputWidgetSchema } from "./type";
declare const InputWidget_base: import("vue-class-component/lib/declarations").VueClass<WidgetBase<InputWidgetSchema>>;
export default class InputWidget extends InputWidget_base {
    get property(): {
        placeholder: string;
        allowClear: boolean;
    } & import("./type").InputWidgetProp;
}
export {};
