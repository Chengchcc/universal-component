import { Vue } from "vue-property-decorator";
import { FilterOption, TableColFilter, TableColumn } from "../../types/column";
import UniversalTable from "../../index.vue";
export default class FilterDropDown extends Vue {
    useWrapperContext: any;
    tableContext: UniversalTable;
    column: TableColumn;
    filters: FilterOption[];
    visible: boolean;
    confirm: Function;
    filter: Partial<FilterOption>;
    get component(): import("vue/types/vue").ExtendedVue<Vue, {}, {}, {}, {
        visible: boolean;
        filters: any;
        confirm: Function;
        column: any;
    }>;
    get dataIndex(): string;
    get type(): "input" | "select" | "user" | "date";
    get curFilter(): Partial<FilterOption>;
    get options(): any;
    get dateProps(): {
        format: string;
    } & import("lodash").Omit<TableColFilter, string>;
    get selectProps(): {
        placeholder: string;
        allowClear: boolean;
        showArrow: boolean;
        showSearch: boolean;
    } & import("lodash").Omit<TableColFilter, string>;
    get userSelectProps(): {
        placeholder: string;
    } & import("lodash").Omit<TableColFilter, string>;
    get formLayout$$(): (labelWidth: number) => {
        labelCol: {
            style: {
                width: string;
                float: string;
                height: string;
            };
        };
        wrapperCol: {
            style: {
                width: string;
                float: string;
                display: string;
                height: string;
            };
        };
    };
    visibleChange(val: boolean): void;
    keywordIsNull(keyword: any): boolean;
    onConfirm(): void;
    onReset(): void;
}
