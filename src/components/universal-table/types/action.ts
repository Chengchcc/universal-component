export interface ColumnAction {
    // 按钮名称
    title: string
    // 按钮触发事件名字
    event: string
    // 是否需要二次确认
    need_confirm?: boolean
    // 二次取人内容
    confirm_content?: (h: any, record: any) => any
    // 样式
    style?: any
    // class
    className?: string
    // button Props
    [prop: string]: any
}
