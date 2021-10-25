<script lang="tsx">
import { cloneDeep, isEqual, omit, pick } from "lodash"
import { VueConstructor } from "vue"
import { Vue, Component, Prop, Inject } from "vue-property-decorator"
import { warning } from "./helper"
import UniversalForm from "./index.vue"
import { FormItemSchema } from "./types/form-item"
import CascaderWidget from "./widgets/cascader/index.vue"
import DateRangeWidget from "./widgets/date-range/index.vue"
import DateWidget from "./widgets/date/index.vue"
import InputWidget from "./widgets/input/index.vue"
import InputAreaWidget from "./widgets/inputArea/index.vue"
import RadioGroupWidget from "./widgets/radio-group/index.vue"
import SelectWidget from "./widgets/select/index.vue"
import TreeSelectWidget from "./widgets/tree-select/index.vue"
const TODOComponent = Vue.extend({
    name: "Todo",
    functional: true,
    render() {
        return <span>TODO</span>
    }
})

@Component({})
export default class IFormItem extends Vue {
    // 组件map
    static widgetsmap: Record<string, any> = {}
    /**
     * 注册组件
     * @param {string} type 组件类型
     * @param {string} name 组件名称
     * @param {Object} component 组件实现
     */
    static registerComponent = function(type: string, name: string, component: VueConstructor) {
        if (IFormItem.widgetsmap[type]) {
            warning("[IFormItem]:" + type + " is already registered")
        }
        IFormItem.widgetsmap[type] = {
            name: name,
            component: component
        }
        IFormItem.component(name, component)
    }
    /**
     * 根据类型获取组件
     * @param {string} type 组件类型
     */
    static getwidget = function(type: string) {
        return IFormItem.widgetsmap[type] || IFormItem.widgetsmap["todo"]
    }

    @Prop()
    schema: FormItemSchema

    @Inject({
        default: () => {
            return {}
        }
    })
    formContext: UniversalForm

    @Inject({
        default: () => {
            warning("useWrapperContext is not provided")
            return {}
        }
    })
    useWrapperContext: any

    get model() {
        return this.formContext.model
    }

    get rules(): any {
        const { rules } = this.schema
        if (rules) {
            return rules
        } else {
            return []
        }
    }

    mounted() {
        const { addField } = this.formContext
        addField && addField(this)
        this.onModelChange(this.model)
    }

    beforeDestory() {
        const { removeField } = this.formContext
        removeField && removeField(this)
    }

    get triggerWatcher() {
        const { control } = this.schema
        if (control) {
            const { trigger, handler } = control
            let oldVal: any = null
            return (model: any) => {
                const newVal = pick(model, trigger)
                if (!isEqual(newVal, oldVal)) {
                    handler(model, this.schema, this.formContext.schema)
                }
                oldVal = cloneDeep(newVal)
            }
        }
        return undefined
    }

    onModelChange(model: any) {
        if (typeof this.triggerWatcher == "function") {
            this.triggerWatcher(model)
        }
    }

    getSlots() {
        const slots = this.schema.slots || {}
        const scopedSlots = omit(this.schema.scopedSlots || {}, ["customLabel", "customRender"])
        const values: string[] = [].concat(Object.values(slots)).concat(Object.values(scopedSlots))
        const widget = IFormItem.getwidget(this.schema.type)
        if (typeof widget.component.computeScopdslots == "function") {
            const ret = widget.component.computeScopdslots.call(this, this.schema)
            values.push(...ret)
        }
        const formCtxSlots = values.reduce((temp, name) => {
            const slot =
                this.formContext.$slots[name] || this.formContext.$scopedSlots[name] || undefined
            if (slot !== undefined) {
                if (typeof slot == "function") {
                    temp[name] = slot
                } else {
                    temp[name] = () => slot
                }
            }
            return temp
        }, {} as any)
        return Object.assign({}, formCtxSlots)
    }

    render() {
        const {
            label,
            showLabel = true,
            tips,
            dataIndex,
            type,
            customLabel,
            customRender,
            scopedSlots = {}
        } = this.schema

        const customRenderH = customRender
            ? (text: any, model: any, schema: any) => {
                  return customRender(this.$createElement, text, model, schema)
              }
            : null

        const customLabelH = customLabel
            ? (schema: any) => {
                  return customLabel(this.$createElement, schema)
              }
            : null

        const customRenderFunc: any =
            this.formContext?.$scopedSlots[scopedSlots["customRender"]] || customRenderH

        const customLabelFunc: any =
            this.formContext?.$scopedSlots[scopedSlots["customLabel"]] || customLabelH

        const Tag = IFormItem.getwidget(type).name

        const tagSlots = this.getSlots()
        const children =
            typeof customRenderFunc == "function" ? (
                customRenderFunc(this.model[dataIndex], this.model, this.schema)
            ) : (
                <Tag
                    schema={this.schema}
                    scopedSlots={{
                        ...tagSlots
                    }}
                />
            )

        return (
            <a-form-model-item
                prop={dataIndex}
                rules={this.rules}
                class={{ "no-label": this.schema.showLabel === false }}
                scopedSlots={{
                    label: () => {
                        if (showLabel === false) return null
                        if (customLabelFunc) {
                            return customLabelFunc(this.schema)
                        } else {
                            return (
                                <a-space>
                                    <span>{label}</span>
                                    {tips ? (
                                        <a-tooltip title={tips}>
                                            {<a-icon type="question-circle" />}
                                        </a-tooltip>
                                    ) : null}
                                </a-space>
                            )
                        }
                    }
                }}
            >
                {
                    // 渲染组件
                    children
                }
            </a-form-model-item>
        )
    }
}
IFormItem.registerComponent("todo", "TODO", TODOComponent)
IFormItem.registerComponent("input", InputWidget.name, InputWidget)
IFormItem.registerComponent("select", SelectWidget.name, SelectWidget)
IFormItem.registerComponent("input-area", InputAreaWidget.name, InputAreaWidget)
IFormItem.registerComponent("date", DateWidget.name, DateWidget)
IFormItem.registerComponent("date-range", DateRangeWidget.name, DateRangeWidget)
IFormItem.registerComponent("radio-group", RadioGroupWidget.name, RadioGroupWidget)
IFormItem.registerComponent("cascader", CascaderWidget.name, CascaderWidget)
IFormItem.registerComponent("tree-select", TreeSelectWidget.name, TreeSelectWidget)
</script>

<style lang="scss" scoped>
.no-label {
    ::v-deep .ant-form-item-control-wrapper {
        width: 100% !important;
    }
}
</style>
