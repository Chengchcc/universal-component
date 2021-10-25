import UniversalButton from "./index.vue"
UniversalButton.install = function(Vue) {
    Vue.component("u-button", UniversalButton)
}

export default UniversalButton
