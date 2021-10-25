<script lang="tsx">
import { Vue, Component, Prop } from "vue-property-decorator"

const getStrFullLength = (str = "") =>
    str.split("").reduce((pre, cur) => {
        const charCode = cur.charCodeAt(0)
        if (charCode >= 0 && charCode <= 128) {
            return pre + 1
        }
        return pre + 2
    }, 0)

const cutStrByFullLength = (str = "", maxLength: number) => {
    let showLength = 0
    return str.split("").reduce((pre, cur) => {
        const charCode = cur.charCodeAt(0)
        if (charCode >= 0 && charCode <= 128) {
            showLength += 1
        } else {
            showLength += 2
        }
        if (showLength <= maxLength) {
            return pre + cur
        }
        return pre
    }, "")
}

@Component({
    name: "IEllipsis"
})
export default class IEllipsis extends Vue {
    @Prop({ default: 100 })
    length: number

    @Prop()
    lines: number

    @Prop({ default: true })
    tooltip: Boolean

    renderStrDom(str: string, fullLength: number) {
        return (
            <span>
                <span>
                    {cutStrByFullLength(str, this.length) + (fullLength > this.length ? "..." : "")}
                </span>
            </span>
        )
    }

    renderTooltip(fullStr: string, fullLength: number) {
        return (
            <a-tooltip
                scopedSlots={{
                    title: () => fullStr
                }}
            >
                {this.renderStrDom(fullStr, fullLength)}
            </a-tooltip>
        )
    }

    showTooltip = false

    renderLines() {
        const id = `ellipsis-${`${Date.now()}${(Math.random() * 100) >>> 0}`}`
        const style = `#${id}{-webkit-line-clamp: ${this.lines};-webkit-box-orient:vertical;}`

        return (
            <div
                id={id}
                {...{ props: { ...this.$attrs }, on: { ...this.$listeners } }}
                class="ellipsis-lineClamp"
                v-ant-ref={(e: any) => {
                    if (e) {
                        const lineHeight = parseInt(getComputedStyle(e).lineHeight)
                        const scrollHeight = e.scrollHeight
                        if (lineHeight * this.lines < scrollHeight) {
                            this.showTooltip = true
                        }
                    }
                }}
            >
                <style>{style}</style>
                {this.tooltip && this.showTooltip ? (
                    <a-tooltip
                        scopedSlots={{
                            title: () => this.$slots.default
                        }}
                    >
                        {this.$slots.default}
                    </a-tooltip>
                ) : (
                    this.$slots.default
                )}
            </div>
        )
    }

    render() {
        if (this.lines) {
            return this.renderLines()
        }
        const str = this.$slots.default.map(vNode => vNode.text).join("")
        const fullLength = getStrFullLength(str)
        const strDom =
            this.tooltip && fullLength > this.length
                ? this.renderTooltip(str, fullLength)
                : this.renderStrDom(str, fullLength)
        return strDom
    }
}
</script>

<style lang="scss" scoped>
.ellipsis-lineClamp {
    position: relative;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
}
</style>
