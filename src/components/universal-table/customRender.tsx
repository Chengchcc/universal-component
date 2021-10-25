import { tDate, textIsNull } from "./helper"
import { TableColumn } from "./types/column"

export const renderMap: Record<string, Function> = {
    date: (h: any, text: any, record: any, props: any) => {
        const { format = "YYYY-MM-DD" } = props || {}
        const arr = [text]
            .flat()
            .filter(Boolean)
            .map(t => tDate(t, format))
        return arr.join("~")
    },
    select: (h: any, text: any, record: any, props: any, ctx: any) => {
        const { options = [], optionsDynamic } = props || {}
        let map: any[] = options
        if (optionsDynamic) {
            map = ctx.useWrapperContext[optionsDynamic] || options || []
        }
        const arr = [text]
            .flat()
            .filter(Boolean)
            .map(ele => {
                return map.find(t => t.value == ele)?.label || ele
            })
        return arr
            .map(t => [<span class="nowrap">{t}</span>, <a-divider type="vertical" />])
            .flat()
            .slice(0, -1)
    },
    status: (h: any, text: any, record: any, props: any, ctx: any) => {
        const { options = [], optionsDynamic } = props || {}
        let map: any[] = options
        if (optionsDynamic) {
            map = ctx.useWrapperContext[optionsDynamic] || options || []
        }
        const el = map.find(t => t.value == text)
        if (el) {
            return (
                <span class="status-tag" style={{ "--color": el.color }}>
                    {el.label}
                </span>
            )
        } else {
            return "--"
        }
    },
    link: (h: any, text: any, record: any, props: any) => {
        const { onClick = () => 0 } = props
        return (
            <a-button type="link" style="padding:0" onClick={() => onClick(record)}>
                {text}
            </a-button>
        )
    }
}

export default function customRender(ctx: any, col: TableColumn, item: TableColumn) {
    const { renderType, renderProps = {} } = item
    const render = renderMap[renderType]
    const h = ctx.$createElement
    if (typeof render === "function") {
        col.customRender = function(text: any, record: any) {
            if (textIsNull(text) && renderProps.renderNoData !== false) {
                return "--"
            }
            return render(h, text, record, renderProps, ctx)
        }
    }
}
