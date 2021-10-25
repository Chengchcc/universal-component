import { Vue } from "vue-property-decorator";
import { FormItemSchema } from "@/components/universal-form/types/form-item";
export default class QueryForm extends Vue {
    schema: FormItemSchema[];
    colLimit: number;
    model: any;
    get innerModel(): any;
    set innerModel(val: any);
    collapse: boolean;
    get formatSchema(): {
        span: number;
        label: string;
        showLabel: boolean;
        dataIndex: string;
        tips: string;
        type: string;
        property: any;
        scopedSlots: any;
        slots: any;
        customRender: (h: any, text: any, model: any, schema: FormItemSchema) => any;
        customLabel: (h: any, schema: FormItemSchema) => any;
        on: Record<string, Function>;
        offset?: number;
        eol?: boolean;
        ignore?: boolean;
        control?: {
            trigger?: string[];
            handler: (model: any, item_schema: FormItemSchema, form_schema: import("../../../universal-form/types/schema").FormSchema) => void;
        };
        rules?: import("async-validator").Rules;
    }[];
    get actionSchema(): Partial<FormItemSchema>;
    get innerSchema(): any[];
    onSearch(): this;
    onReset(): this;
    render(): JSX.Element;
}
