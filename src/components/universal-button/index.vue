<script lang="tsx">
import { Vue, Component, Prop } from "vue-property-decorator"
//@ts-ignore-nex-line
import buttonType from "ant-design-vue/es/button/buttonTypes"
import { omit } from "lodash"
@Component({
    name: "IAdvanceButton",
    props: buttonType()
})
export default class IAdvanceButton extends Vue {
    @Prop()
    needConfirm: boolean

    @Prop()
    confirmText: string

    @Prop()
    tooltip: string

    @Prop()
    disabled: boolean

    get props() {
        return omit(this.$props, ["needConfirm", "confirmText", "tooltip"])
    }

    renderBtn() {
        const on = this.needConfirm
            ? Object.assign({}, this.$listeners, { click: (e: any) => e.stopPropagation() })
            : this.$listeners
        const attrs = {
            ...this.$attrs,
            on: on,
            props: { ...this.props }
        }
        const children = this.$scopedSlots.default(this.$createElement)
        return <a-button {...attrs}>{children}</a-button>
    }

    renderPopConfirm() {
        return (
            <a-popconfirm
                title={this.confirmText}
                onConfirm={() => {
                    this.$emit("click")
                }}
            >
                {this.renderBtn()}
            </a-popconfirm>
        )
    }

    renderTooltip() {
        return (
            <a-tooltip title={this.tooltip}>
                {this.needConfirm ? this.renderPopConfirm() : this.renderBtn()}
            </a-tooltip>
        )
    }

    render() {
        if (this.tooltip) {
            return this.renderTooltip()
        } else if (this.needConfirm && this.disabled !== true) {
            return this.renderPopConfirm()
        } else {
            return this.renderBtn()
        }
    }
}
</script>

<style scoped></style>
