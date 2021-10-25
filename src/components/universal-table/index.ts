import UniversalTable from "./index.vue"
import ActionsPanel from "./components/actions-panel/index.vue"
UniversalTable.install = function(Vue) {
    Vue.component("u-table", UniversalTable)
    Vue.component("u-actions-panel", ActionsPanel)
}

export default UniversalTable
