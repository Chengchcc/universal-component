import { Vue } from "vue-property-decorator";
import { FormItemProp } from "../types/form-item";
export default class WidgetBase<T extends FormItemProp> extends Vue {
    schema: T;
    formContext: any;
    useWrapperContext: any;
    get model(): any;
    get dataIndex(): string;
    get value(): any;
    set value(val: any);
    get listeners(): {
        [x: string]: Function | Function[];
    };
    get scopedSlots(): import("lodash").Omit<any, "customRender" | "customLabel">;
    get slots(): Pick<any, string | number | symbol>;
}
