import { Vue } from "vue-property-decorator";
import UniversalTable from "../../index.vue";
export default class FilterPanel extends Vue {
    tableContext: UniversalTable;
    useWrapperContext: any;
    get filters(): import("../../types/column").FilterOption[];
    get sorts(): import("../../types/column").SortOption[];
    get columns(): import("../../types/column").TableColumn[];
    get columnGetter(): (dataIndex: string) => import("../../types/column").TableColumn;
    get tTagFilter(): (dataIndex: string) => Function;
    delSort(dataIndex: string): void;
    delFilter(dataIndex: string): void;
}
