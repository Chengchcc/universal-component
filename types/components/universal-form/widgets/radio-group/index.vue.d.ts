import WidgetBase from "../mixin";
import { RadioGroupWidgetSchema } from "./type";
declare const RadioGroupWidget_base: import("vue-class-component/lib/declarations").VueClass<WidgetBase<RadioGroupWidgetSchema>>;
export default class RadioGroupWidget extends RadioGroupWidget_base {
    get options(): any;
    get property(): {
        buttonStyle: string;
    } & {
        [key: string]: any;
    };
}
export {};
