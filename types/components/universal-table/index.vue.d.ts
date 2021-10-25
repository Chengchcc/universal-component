import { FilterOption, SortOption, TableColumn } from "./types/column";
import PaginationHelper from "./paginationHelper";
import { Table } from "ant-design-vue";
import ActionsPanel from "./components/actions-panel/index.vue";
import { ColumnAction } from "./types/action";
declare const IUniversalTable_base: import("vue-class-component/lib/declarations").VueClass<PaginationHelper>;
export default class IUniversalTable extends IUniversalTable_base {
    static ActionsPanel: typeof ActionsPanel;
    static ColumnPresets: Record<string, TableColumn>;
    static registerCustomReneder(name: string, render: Function): void;
    static registerPreset(name: string, column: TableColumn): void;
    static getPresetColumn(column: TableColumn): TableColumn;
    static getPresetColumnProp(column: TableColumn, prop: string): any;
    refTable: Table;
    get tableContext(): this;
    useWrapperContext: any;
    columns: TableColumn[];
    tableName: string;
    maxHeight: number;
    customActions: (record: any, idx: number) => ColumnAction[];
    showActions: boolean;
    handleSearch: (keyword: string, pagination: any, sorts: SortOption[], filters: FilterOption[]) => Promise<{
        total: number;
        list: any;
    }>;
    dataSource: any;
    sorts: SortOption[];
    filters: FilterOption[];
    keyword: string;
    loading: boolean;
    colSetting: Record<string, {
        visible: number;
        width: number;
    }>;
    colsWidth: Record<string, number>;
    get vBinds(): import("lodash").Omit<Record<string, any>, string>;
    get vPaginationBinds(): Partial<{
        current: number;
        pageSize: number;
        showQuickJumper: boolean;
        showSizeChanger: boolean;
        showLessItems: boolean;
        size: string;
        total: number;
        readonly limit: any;
        readonly offset: number;
        showTotal: (total: number) => string;
        onChange: (page: number, pageSize: number) => void;
        onShowSizeChange: (current: number, size: number) => void;
    }>;
    get columnSlots(): {};
    get innerColumns(): TableColumn[];
    onFilterConfirm(scope: any): void;
    dragging: boolean;
    get components(): {
        header: {
            cell: ({ props, children, listeners, ...other }: any) => JSX.Element;
        };
    };
    get storageKey(): string;
    onFiltersChange(): void;
    onSortsChange(): void;
    getColSettingFromStorage(): void;
    resetColSetting(): void;
    setColSetting(colSetting: Record<string, {
        visible: number;
        width: number;
    }>): void;
    saveColSetting(): void;
    resizeColumns(columns: TableColumn[]): void;
    onSortChange(sorters: any): void;
    onSearchChange(e: any): void;
    fixedWidth: number;
    calcFixedWidth(): void;
    mounted(): void;
    onSearch(): Promise<void>;
}
export {};
