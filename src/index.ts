import UniversalTable from "./components/universal-table"
import UniversalButton from "./components/universal-button"
import Ellipsis from "./components/ellipsis"
import UniversalForm from "./components/universal-form"
import { VueConstructor } from "vue"

const components = [UniversalTable, UniversalButton, Ellipsis, UniversalForm]

const install = function(Vue: VueConstructor, opts = {}) {
    components.forEach(component => {
        component.install(Vue)
    })
}

export default {
    install,
    UniversalButton,
    UniversalTable,
    Ellipsis,
    UniversalForm
}
