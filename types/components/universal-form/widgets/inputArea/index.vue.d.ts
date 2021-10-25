import WidgetBase from "../mixin";
import { InputWidgetSchema } from "../input/type";
declare const InputAreaWidget_base: import("vue-class-component/lib/declarations").VueClass<WidgetBase<InputWidgetSchema>>;
export default class InputAreaWidget extends InputAreaWidget_base {
    get property(): {
        placeholder: string;
        allowClear: boolean;
        rows: number;
    } & import("../input/type").InputWidgetProp;
}
export {};
