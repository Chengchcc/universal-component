import { Vue } from "vue-property-decorator";
export default class PaginationHelper extends Vue {
    pagination: {
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
    };
    onSearch(): void;
}
