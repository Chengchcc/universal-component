import WidgetBase from "../mixin";
import { DateWidgetSchema } from "./type";
declare const DateWidget_base: import("vue-class-component/lib/declarations").VueClass<WidgetBase<DateWidgetSchema>>;
export default class DateWidget extends DateWidget_base {
    get property(): {
        format: string;
        valueFormat: string;
    } & import("./type").DateWidgetProp;
}
export {};
