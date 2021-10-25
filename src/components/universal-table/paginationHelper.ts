import { Vue, Component } from "vue-property-decorator"

@Component({})
export default class PaginationHelper extends Vue {
    pagination = {
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        showLessItems: true,
        size: "normal",
        total: 0,
        get limit() {
            return this.pageSize
        },
        get offset() {
            return (this.current - 1) * this.pageSize
        },
        showTotal: (total: number) => `共${total}项`,
        onChange: (page: number, pageSize: number) => {
            this.pagination.pageSize = pageSize
            this.pagination.current = page
            this.onSearch()
        },
        onShowSizeChange: (current: number, size: number) => {
            this.pagination.pageSize = size
            this.pagination.current = 1
            this.onSearch()
        }
    }

    onSearch() {
        throw new Error("onSearch not implemented")
    }
}
