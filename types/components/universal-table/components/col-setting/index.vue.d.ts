import { Vue } from "vue-property-decorator";
import UniversalTable from "../../index.vue";
export default class ColSetting extends Vue {
    tableContext: UniversalTable;
    get columns(): import("../../types/column").TableColumn[];
    get columnGetter(): (dataIndex: string) => import("../../types/column").TableColumn;
    visible: boolean;
    innerColSetting: Record<string, {
        visible: number;
        width: number;
    }>;
    onVisibleChange(visible: boolean): void;
    onConfirm(): void;
    onReset(): void;
}
