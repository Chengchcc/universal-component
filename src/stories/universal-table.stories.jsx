import UniversalTable from "@/components/universal-table/index.vue"
import QueryForm from "@/components/universal-table/components/query-form/index.vue"
import FilterPanel from "@/components/universal-table/components/filter-panel/index.vue"
import { omit } from "lodash"
const mockData = require("./mock.json")
export default {
    title: "Example/通用表格",
    component: UniversalTable,
    argTypes: {}
}
const BaseData = {
    keyword: "",
    pagination: {},
    sorts: [],
    filters: [],
    businesses: [
        {
            value: 1,
            label: "部门1"
        },
        {
            value: 2,
            label: "部门2"
        },
        {
            value: 3,
            label: "部门3"
        }
    ],
    statuses: [
        { label: "待处理", value: 0, color: "#ffc009" },
        { label: "跟进中", value: 1, color: "#00b0f0" },
        { label: "已完成", value: 2, color: "#67C23A" }
    ]
}
const Base = {
    components: { UniversalTable },
    provide() {
        return {
            useWrapperContext: this.useWrapperContext
        }
    },
    computed: {
        useWrapperContext() {
            return this
        }
    },
    data() {
        return BaseData
    },
    methods: {
        async handleSearchInner(keyword, pagination, sorts, filters) {
            this.keyword = keyword
            this.pagination = pagination
            this.sorts = sorts
            this.filters = filters

            return new Promise(resolve => {
                const delay = ((Math.random() * 700) >>> 0) + 300
                setTimeout(() => {
                    resolve(mockData.data)
                }, delay)
            })
        },
        onDispatch(e) {
            const { event, payload } = e
            this.$notification.info({
                message: `事件: ${event}`,
                description: JSON.stringify(payload, -2, "\n")
            })
        }
    }
}

const args = {
    customActions: record => {
        const actions = {
            finish: {
                title: "完成",
                event: "finish"
            },
            edit: {
                title: "编辑",
                event: "edit"
            },
            del: {
                title: "删除",
                event: "del",
                need_confirm: true,
                confirm_content: (h, record2) => {
                    return <span>你确定要删除事件:{record2.title}吗？</span>
                },
                style: {
                    color: "red"
                }
            },
            submit: {
                title: "提交",
                event: "submit"
            }
        }
        if (record.status == 2) {
            return Object.values(omit(actions, ["edit"]))
        } else {
            return Object.values(actions)
        }
    },
    columns: [
        {
            title: "事件名称",
            dataIndex: "title",
            width: 250,
            filter: {
                scopedSlots: { filterDropdown: "title-filter" }
            },
            renderType: "link",
            renderProps: {
                onClick: e => {
                    alert(JSON.stringify(e))
                }
            }
        },
        {
            title: "监管部门",
            dataIndex: "department",
            sort: {},
            filter: {
                type: "input"
            },
            width: 110
        },
        {
            title: "来源渠道",
            dataIndex: "source",
            width: 120
        },
        {
            title: "业务线",
            dataIndex: "business_ids",
            width: 120,
            filter: {
                type: "select",
                optionsDynamic: "businesses",
                mode: "multiple"
            },
            renderType: "select",
            renderProps: {
                optionsDynamic: "businesses"
            }
        },
        {
            title: "处理状态",
            dataIndex: "status",
            filter: {
                type: "select",
                optionsDynamic: "statuses",
                mode: "multiple"
            },
            renderType: "status",
            renderProps: {
                optionsDynamic: "statuses",
                renderNoData: false
            },
            width: 120
        },
        {
            title: "创建时间",
            dataIndex: "create_time",
            preset: "date"
        },
        {
            title: "完成时间",
            dataIndex: "finished_time",
            preset: "date"
        }
    ]
}

export const 基本用法 = (args, { argTypes }) =>
    Object.assign({}, Base, {
        props: Object.keys(argTypes),
        data() {
            return {
                ...BaseData
            }
        },
        template: `
        <div class="story-container">
            <universal-table
                :columns="columns"
                :handleSearch="handleSearchInner"
                :customActions="customActions"
                row-key="id"
                table-name="basic"
                @dispatch="onDispatch"
            >
                <template #title-filter="scope">
                    <a-form-model>
                        <a-input-search @search="e=>{
                            const filter= scope.filters.find(e=>e.dataIndex === 'title')
                            if(!filter){
                                if(e){
                                    scope.filters.push({dataIndex: 'title', keyword: e})
                                }
                            }else {
                                if(e){
                                    filter.keyword = e
                                }else {
                                    scope.filters.splice(scope.filters.findIndex(e=>e.dataIndex === 'title'), 1)
                                }
                            }
                            scope.confirm()
                        }"/>
                    </a-form-model>
                </template>
            </universal-table>
            <a-form-model layout="inline">
                <a-row>
                    <a-col :span="6">
                        <a-form-model-item label="keyword">
                            {{keyword}}
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-model-item label="pagination">
                            {{pagination}}
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-model-item label="sorts">
                            {{sorts}}
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-model-item label="filters">
                            {{filters}}
                        </a-form-model-item>
                    </a-col>
                </a-row>
            </a-form-model>
        </div>

    `
    })

基本用法.args = args

export const 更多筛选项 = (args, { argTypes }) =>
    Object.assign({}, Base, {
        components: {
            UniversalTable,
            QueryForm,
            FilterPanel
        },
        props: [
            "customActions",
            "columns",
            "tableName",
            "maxHeight",
            "showActions",
            "handleSearch",
            "dispatch",
            "table-search",
            "default",
            "searchSchema"
        ],
        data() {
            return {
                ...BaseData,
                searchModel: {}
            }
        },
        methods: {
            async handleSearchInner(keyword, pagination, sorts, filters) {
                this.keyword = keyword
                this.pagination = pagination
                this.sorts = sorts
                this.filters = filters

                return new Promise(resolve => {
                    const delay = ((Math.random() * 700) >>> 0) + 300
                    setTimeout(() => {
                        resolve(mockData.data)
                    }, delay)
                })
            },
            onSearch() {
                this.$refs.table.onSearch()
            },
            onDispatch(e) {
                const { event, payload } = e
                this.$notification.info({
                    message: `事件: ${event}`,
                    description: JSON.stringify(payload, -2, "\n")
                })
            }
        },
        template: `
        <div class="story-container">
            <universal-table
                ref="table"
                :columns="columns"
                :handleSearch="handleSearchInner"
                :customActions="customActions"
                row-key="id"
                table-name="basic"
                @dispatch="onDispatch"
            >
                <template #table-search>
                    <query-form :schema="searchSchema" v-model="searchModel" @search="onSearch"/>
                </template>
                <template #table-sub-header>
                    <filter-panel style="min-height: 33px"/>
                </template>
                <template #title-filter="scope">
                    <a-form-model>
                        <a-input-search @search="e=>{
                            const filter= scope.filters.find(e=>e.dataIndex === 'title')
                            if(!filter){
                                if(e){
                                    scope.filters.push({dataIndex: 'title', keyword: e})
                                }
                            }else {
                                if(e){
                                    filter.keyword = e
                                }else {
                                    scope.filters.splice(scope.filters.findIndex(e=>e.dataIndex === 'title'), 1)
                                }
                            }
                            scope.confirm()
                        }"/>
                    </a-form-model>
                </template>
            </universal-table>
            <a-form-model layout="inline">
                <a-row>
                    <a-col :span="6">
                        <a-form-model-item label="searchModel">
                            {{searchModel}}
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-model-item label="pagination">
                            {{pagination}}
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-model-item label="sorts">
                            {{sorts}}
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="6">
                        <a-form-model-item label="filters">
                            {{filters}}
                        </a-form-model-item>
                    </a-col>
                </a-row>
            </a-form-model>
        </div>

    `
    })

更多筛选项.args = Object.assign({}, args, {
    searchSchema: [
        {
            label: "监管部门",
            dataIndex: "department",
            type: "input",
            property: {
                placeholder: "请填写"
            }
        },
        {
            label: "业务线",
            dataIndex: "business_ids",
            type: "select",
            property: {
                optionsDynamic: "businesses",
                mode: "multiple"
            }
        },
        {
            label: "创建人",
            dataIndex: "creator_uid",
            type: "user-select",
            property: {
                multiple: true
            }
        },
        {
            label: "处理人",
            dataIndex: "target_uid",
            type: "user-select",
            property: {
                multiple: true
            }
        }
    ]
})
