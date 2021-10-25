export interface ColumnAction {
    title: string;
    event: string;
    need_confirm?: boolean;
    confirm_content?: (h: any, record: any) => any;
    style?: any;
    className?: string;
    [prop: string]: any;
}
