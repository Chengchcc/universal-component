import WidgetBase from "../mixin";
import { DateRangeWidgetSchema } from "./type";
declare const DateRangeWidget_base: import("vue-class-component/lib/declarations").VueClass<WidgetBase<DateRangeWidgetSchema>>;
export default class DateRangeWidget extends DateRangeWidget_base {
    get property(): {
        format: string;
        valueFormat: string;
    } & import("./type").DateRangeWidgetProp;
}
export {};
