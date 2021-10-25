<template>
    <a-form-model ref="form" :model="model" v-bind="formLayout$$">
        <universal-form-core :schema="innerSchema" :gutter="gutter" />
    </a-form-model>
</template>

<script lang="ts">
import { FormModel } from "ant-design-vue"
import { cloneDeep, isEqual } from "lodash"
import { VueConstructor } from "vue"
import { Vue, Component, Prop, Model, Watch, Ref, Provide } from "vue-property-decorator"
import UniversalFormCore from "./core.vue"
import FormItem from "./form-item.vue"
import { FormSchema } from "./types/schema"
@Component({
    name: "IUniversalForm",
    components: {
        UniversalFormCore
    }
})
export default class IUniversalForm extends Vue {
    /**
     * 注册组件
     * @param {string} type 组件类型
     * @param {string} name 组件名称
     * @param {Object} component 组件实现
     */
    static registerComponent = function(type: string, name: string, component: VueConstructor) {
        FormItem.registerComponent(type, name, component)
    }

    @Prop()
    schema: FormSchema

    // 拷贝schema 不让control影响外部schema
    innerSchema: FormSchema = []

    @Watch("schema", { deep: true, immediate: true })
    schemaChange(val: FormSchema) {
        this.innerSchema = cloneDeep(val)
    }

    /**
     * 表单模式 vertical | horizontal
     */
    @Prop({ type: String, default: "horizontal" })
    mode: "vertical" | "horizontal"

    /**
     * label width
     */
    @Prop({ type: Number, default: 100 })
    labelWidth: number

    /**
     * 栅格间隔
     */
    @Prop({ type: [Number, Object, Array], default: 6 })
    gutter: any

    @Model("change")
    value: any

    @Ref("form")
    refFrom: FormModel

    @Provide()
    get formContext() {
        return this
    }

    get formLayout$$() {
        if (this.mode == "vertical") {
            return {
                labelCol: {
                    style: { width: this.labelWidth + "px", float: "left", height: "100%" }
                },
                wrapperCol: {
                    style: {
                        width: `calc(100% - ${this.labelWidth + "px"})`,
                        float: "left",
                        display: "block",
                        height: "100%"
                    }
                }
            }
        } else {
            return {}
        }
    }

    model: any = {}

    @Watch("value", { immediate: true, deep: true })
    valueChange(val: any) {
        if (!isEqual(val, this.model)) {
            this.model = cloneDeep(val)
        }
    }

    @Watch("model", { deep: true })
    modelChange(val: any) {
        if (!isEqual(val, this.value)) {
            this.$emit("change", val)
        }
        if (this.fields) {
            this.fields.forEach(field => field.onModelChange(val))
        }
    }

    validate() {
        return this.refFrom.validate()
    }

    resetFields() {
        return this.refFrom.resetFields()
    }

    fields: FormItem[]

    addField(field: FormItem) {
        if (field) {
            if (!this.fields) {
                this.fields = []
            }
            return this.fields.push(field)
        }
    }

    removeField(field: FormItem) {
        if (field.$props) {
            if (this.fields) {
                this.fields.splice(this.fields.indexOf(field), 1)
            }
        }
    }
}
</script>

<style scoped></style>
