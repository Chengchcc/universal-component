import { Vue, Component, Prop, Inject } from "vue-property-decorator"
import { FormItemProp } from "../types/form-item"
import { omit } from "lodash"
import { warning } from "../helper"

@Component({})
export default class WidgetBase<T extends FormItemProp> extends Vue {
    @Prop()
    schema: T

    @Inject({ default: () => ({}) })
    formContext: any

    @Inject({
        default: () => {
            warning("useWrapperContext is not provided")
            return {}
        }
    })
    useWrapperContext: any

    get model() {
        return (this.formContext as any).model
    }

    get dataIndex() {
        return this.schema.dataIndex
    }

    get value() {
        return this.model[this.dataIndex]
    }

    set value(val) {
        if (!val) {
            this.$delete(this.model, this.dataIndex)
        } else {
            if (this.model[this.dataIndex]) {
                this.model[this.dataIndex] = val
            } else {
                // 首次赋值用$set 触发双向绑定
                this.$set(this.model, this.dataIndex, val)
            }
        }
    }

    get listeners() {
        const { on } = this.schema
        const listeners = { ...this.$listeners }
        if (on) {
            Object.entries(on).map(([event, handler]) => {
                const handlers = listeners[event]
                if (Array.isArray(handlers)) {
                    handlers.push(handler)
                } else if (typeof handlers == "function") {
                    listeners[event] = [handlers, handler]
                } else {
                    listeners[event] = handler
                }
            })
        }
        return listeners
    }

    get scopedSlots() {
        const scopedSlots = this.schema.scopedSlots || {}
        return omit(scopedSlots, ["customLabel", "customRender"])
    }

    get slots() {
        const slots = this.schema.slots || {}
        return omit(slots)
    }
}
