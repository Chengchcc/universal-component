<script lang="tsx">
import { Vue, Component, Prop } from "vue-property-decorator"
import { ColumnAction } from "../../types/action"
import UniversalButton from "@/components/universal-button/index.vue"
@Component({
    name: "IActionsPanel",
    components: {
        UniversalButton
    }
})
export default class IActionsPanel extends Vue {
    @Prop()
    actions: ColumnAction[]

    @Prop({ default: 3 })
    limit: number

    @Prop()
    record: any

    /**
     * 是否是链接按钮
     */
    @Prop({ default: true })
    isLink: boolean

    /**
     * 是否展示分割符
     */
    @Prop({ default: true })
    showDivider: boolean

    renderAction(action: ColumnAction) {
        const { event, need_confirm, confirmText, ...props } = action
        return (
            <universal-button
                key={action.event}
                type={props.type ? props.type : this.isLink ? "link" : undefined}
                buttonStyle={action.style}
                className={action.className}
                needConfirm={action.need_confirm}
                {...{ props }}
                confirmText={() => {
                    if (typeof action.confirm_content === "function") {
                        return action.confirm_content(this.$createElement, this.record)
                    }
                }}
                onClick={() => {
                    this.$emit("dispatch", action.event)
                }}
            >
                {action.title}
            </universal-button>
        )
    }

    dropDownVisible = false

    renderDropDown(actions: ColumnAction[]) {
        return (
            <a-dropdown
                key="more"
                trigger={["click"]}
                vModel={this.dropDownVisible}
                scopedSlots={{
                    overlay: () => {
                        return (
                            <a-menu>
                                {actions.map(a => {
                                    const aa = Object.assign({}, a, { type: "link" })
                                    return (
                                        <a-menu-item key={a.event}>
                                            {this.renderAction(aa)}
                                        </a-menu-item>
                                    )
                                })}
                            </a-menu>
                        )
                    }
                }}
            >
                <universal-button type={this.isLink ? "link" : "primary"}>
                    更多
                    <a-icon type={this.dropDownVisible ? "up" : "down"} />
                </universal-button>
            </a-dropdown>
        )
    }

    render() {
        if (this.actions.length > this.limit) {
            return (
                <a-space size={this.showDivider ? 0 : 8}>
                    {this.actions
                        .slice(0, this.limit - 1)
                        .map(a => {
                            const ret = [this.renderAction(a)]
                            if (this.showDivider) {
                                ret.push(<a-divider type="vertical" key={a.event + "_divider"} />)
                            }
                            return ret
                        })
                        .concat([this.renderDropDown(this.actions.slice(this.limit - 1))])
                        .flat()}
                </a-space>
            )
        } else {
            const actions = this.actions
                .map((a, idx) => {
                    const ret = [this.renderAction(a)]
                    if (this.showDivider && idx < this.actions.length - 1) {
                        ret.push(<a-divider type="vertical" key={a.event + "_divider"} />)
                    }
                    return ret
                })
                .flat()
            return <a-space size={this.showDivider ? 0 : 8}>{actions}</a-space>
        }
    }
}
</script>

<style lang="scss" scoped>
.ant-btn-link {
    padding: 0;
}

.anticon-up,
.anticon-down {
    margin-left: 0;
    font-size: 12px !important;
    display: inline-block;
}
.ant-dropdown-menu-item {
    min-width: 80px;
}
</style>
