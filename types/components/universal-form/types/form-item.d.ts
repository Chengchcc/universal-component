import { Rules } from "async-validator";
import { FormSchema } from "./schema";
export interface FormItemProp<T extends string = string, P extends Record<string, any> = any> {
    /**
     * 标签
     */
    label: string;
    /**
     * 是否展示标签
     */
    showLabel: boolean;
    /**
     * model映射
     */
    dataIndex: string;
    /**
     * 提示
     */
    tips: string;
    /**
     * 组件类型
     */
    type: T;
    /**
     * 组件配置
     */
    property: P;
    /**
     * scopedSlots
     */
    scopedSlots: any;
    /**
     * slots
     */
    slots: any;
    /**
     * customRender 满足jsx
     */
    customRender: (h: any, text: any, model: any, schema: FormItemSchema) => any;
    /**
     * customLabel 满足jsx
     */
    customLabel: (h: any, schema: FormItemSchema) => any;
    /**
     * event handler
     * 添加modifier的方法见https://vuejs.org/v2/guide/render-function.html#Event-amp-Key-Modifiers
     */
    on: Record<string, Function>;
}
export interface CommonWidgetProp {
    [key: string]: any;
}
export interface FormItemReplacementProp {
    span?: number;
    offset?: number;
    eol?: boolean;
}
export interface FormItemControlProp {
    /**
     * 是否忽略不展示该item
     */
    ignore?: boolean;
    /**
     * 控件控制配置
     */
    control?: {
        /**
         * model相关属性改变时触发
         */
        trigger?: string[];
        /**
         * 控制器
         */
        handler: (model: any, item_schema: FormItemSchema, form_schema: FormSchema) => void;
    };
}
export interface FormItemRuleProp {
    /**
     * 校验规则 参考 async-validator
     */
    rules?: Rules;
}
export declare type FormItemSchema = FormItemProp & Partial<FormItemReplacementProp> & FormItemControlProp & FormItemRuleProp;
