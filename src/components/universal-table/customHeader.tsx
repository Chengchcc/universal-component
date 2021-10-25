import { TableColSort, TableColumn } from "./types/column"

export default function customTitle(ctx: any, col: TableColumn, item: TableColumn) {
    const h = ctx.$createElement
    // const t = ctx.$i18n.t.bind(ctx.$i18n)
    return () => {
        const { sort, title, dataIndex } = item
        if (sort) {
            const onClick = () => {
                ctx.onSortChange({
                    dataIndex: dataIndex,
                    order: (col.sort as TableColSort).order
                })
            }
            const upClass = ["ant-table-column-sorter-up"]
            const downClass = ["ant-table-column-sorter-down"]
            ;(col.sort as TableColSort)?.order === "ascend"
                ? upClass.push("on")
                : upClass.push("off")
            ;(col.sort as TableColSort)?.order === "descend"
                ? downClass.push("on")
                : downClass.push("off")
            return (
                <div class="ant-table-column-sorters ant-table-column-sorters--custom">
                    <span class="ant-table-column-title">{title}</span>
                    <span class="ant-table-column-sorter">
                        <div
                            class="ant-table-column-sorter-inner ant-table-column-sorter-inner-full"
                            onClick={onClick}
                        >
                            <a-icon type={"caret-up"} class={upClass.join(" ")}></a-icon>
                            <a-icon type={"caret-down"} class={downClass.join(" ")}></a-icon>
                        </div>
                    </span>
                </div>
            )
        } else {
            return <span>{title}</span>
        }
    }
}
