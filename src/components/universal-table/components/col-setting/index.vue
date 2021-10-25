<template>
    <a-popover v-model="visible" :title="null" :trigger="['click']">
        <template slot="content">
            <ul class="dropdown-content">
                <li v-for="(setting, key) in innerColSetting" :key="key">
                    <span>
                        {{ columnGetter(key).title }}
                    </span>
                    <a-switch
                        checked-children="开"
                        un-checked-children="关"
                        :checked="!!setting.visible"
                        @change="setting.visible = Number(!setting.visible)"
                    />
                </li>
                <li>
                    <a-button type="primary" size="small" @click="onConfirm">确定</a-button>
                    <a-button size="small" @click="onReset">重置</a-button>
                </li>
            </ul>
        </template>
        <a-button icon="setting" type="link" />
    </a-popover>
</template>

<script lang="ts">
import { warning } from "@/components/universal-form/helper"
import { cloneDeep } from "lodash"
import { Vue, Component, Inject, Watch } from "vue-property-decorator"
import UniversalTable from "../../index.vue"
@Component({})
export default class ColSetting extends Vue {
    @Inject({
        default: () => {
            warning("tableContext is not provided")
            return {}
        }
    })
    tableContext: UniversalTable

    get columns() {
        return this.tableContext.columns || []
    }

    get columnGetter() {
        return (dataIndex: string) => {
            return this.columns.find(t => t.dataIndex === dataIndex) ?? {}
        }
    }

    visible = false

    innerColSetting: Record<string, { visible: number; width: number }> = {}

    @Watch("visible")
    onVisibleChange(visible: boolean) {
        if (visible) {
            this.innerColSetting = cloneDeep(this.tableContext.colSetting)
        }
    }

    onConfirm() {
        this.tableContext.setColSetting(this.innerColSetting)
        this.visible = false
    }

    onReset() {
        this.tableContext.resetColSetting()
        this.visible = false
    }
}
</script>
<style lang="scss" scoped>
.dropdown-content {
    list-style: none;
    padding: 0;
    li {
        margin: 0.5em 0;
        min-width: 120px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>
