import { FormModel } from "ant-design-vue";
import { VueConstructor } from "vue";
import { Vue } from "vue-property-decorator";
import FormItem from "./form-item.vue";
import { FormSchema } from "./types/schema";
export default class IUniversalForm extends Vue {
    /**
     * 注册组件
     * @param {string} type 组件类型
     * @param {string} name 组件名称
     * @param {Object} component 组件实现
     */
    static registerComponent: (type: string, name: string, component: VueConstructor) => void;
    schema: FormSchema;
    innerSchema: FormSchema;
    schemaChange(val: FormSchema): void;
    /**
     * 表单模式 vertical | horizontal
     */
    mode: "vertical" | "horizontal";
    /**
     * label width
     */
    labelWidth: number;
    /**
     * 栅格间隔
     */
    gutter: any;
    value: any;
    refFrom: FormModel;
    get formContext(): this;
    get formLayout$$(): {
        labelCol: {
            style: {
                width: string;
                float: string;
                height: string;
            };
        };
        wrapperCol: {
            style: {
                width: string;
                float: string;
                display: string;
                height: string;
            };
        };
    } | {
        labelCol?: undefined;
        wrapperCol?: undefined;
    };
    model: any;
    valueChange(val: any): void;
    modelChange(val: any): void;
    validate(): void | Promise<any>;
    resetFields(): void;
    fields: FormItem[];
    addField(field: FormItem): number;
    removeField(field: FormItem): void;
}
