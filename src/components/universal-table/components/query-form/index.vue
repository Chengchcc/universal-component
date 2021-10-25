<script lang="tsx">
import { Vue, Component, Prop, Model } from "vue-property-decorator"
import UniversalForm from "@/components/universal-form/index.vue"
import { FormItemSchema } from "@/components/universal-form/types/form-item"
@Component({
    components: {
        UniversalForm
    }
})
export default class QueryForm extends Vue {
    @Prop()
    schema: FormItemSchema[]

    @Prop({ default: 4 })
    colLimit: number

    @Model("change")
    model: any

    get innerModel() {
        return this.model
    }

    set innerModel(val) {
        this.$emit("change", val)
    }

    collapse = true

    get formatSchema() {
        return this.schema.map(s => ({
            ...s,
            span: (24 / this.colLimit) >>> 0
        }))
    }

    get actionSchema(): Partial<FormItemSchema> {
        const span = (24 / this.colLimit) >>> 0
        const len =
            this.collapse && this.formatSchema.length > this.colLimit
                ? this.formatSchema.slice(0, this.colLimit - 1).length
                : this.formatSchema.length % this.colLimit
        const offset = (24 - (len + 1) * span + 24) % 24
        return {
            showLabel: false,
            span: span,
            offset: offset,
            scopedSlots: { customRender: "actions" }
        }
    }

    get innerSchema() {
        return this.formatSchema.length > this.colLimit && this.collapse
            ? [].concat(this.formatSchema.slice(0, this.colLimit - 1)).concat(this.actionSchema)
            : [].concat(this.formatSchema).concat(this.actionSchema)
    }

    onSearch() {
        return this.$emit("search")
    }

    onReset() {
        this.innerModel = {}
        return this.$emit("search")
    }

    render() {
        return (
            <div>
                <universal-form
                    schema={this.innerSchema}
                    vModel={this.innerModel}
                    mode="vertical"
                    labelWidth={80}
                    on={{
                        ...this.$listeners
                    }}
                    scopedSlots={{
                        ...this.$scopedSlots,
                        actions: () => {
                            return (
                                <a-space style="width:100%; justify-content: flex-end">
                                    <a-button type="primary" onClick={this.onSearch}>
                                        搜索
                                    </a-button>
                                    <a-button onClick={this.onReset}>重置</a-button>
                                    {this.formatSchema.length > this.colLimit ? (
                                        <a-button
                                            type="link"
                                            style="padding: 0"
                                            onClick={() => {
                                                this.collapse = !this.collapse
                                            }}
                                        >
                                            {this.collapse ? (
                                                <span>
                                                    展开
                                                    <a-icon type="down" />
                                                </span>
                                            ) : (
                                                <span>
                                                    收起
                                                    <a-icon type="up" />
                                                </span>
                                            )}
                                        </a-button>
                                    ) : null}
                                </a-space>
                            )
                        }
                    }}
                />
            </div>
        )
    }
}
</script>

<style lang="scss" scoped>
::v-deep .ant-form-item {
    margin-bottom: 0;
}
</style>
