import { VueConstructor } from "vue";
import { Vue } from "vue-property-decorator";
import UniversalForm from "./index.vue";
import { FormItemSchema } from "./types/form-item";
export default class IFormItem extends Vue {
    static widgetsmap: Record<string, any>;
    /**
     * 注册组件
     * @param {string} type 组件类型
     * @param {string} name 组件名称
     * @param {Object} component 组件实现
     */
    static registerComponent: (type: string, name: string, component: VueConstructor) => void;
    /**
     * 根据类型获取组件
     * @param {string} type 组件类型
     */
    static getwidget: (type: string) => any;
    schema: FormItemSchema;
    formContext: UniversalForm;
    useWrapperContext: any;
    get model(): any;
    get rules(): any;
    mounted(): void;
    beforeDestory(): void;
    get triggerWatcher(): (model: any) => void;
    onModelChange(model: any): void;
    getSlots(): any;
    render(): JSX.Element;
}
