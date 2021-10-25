const path = require('path')
const Components = require('../components.json')
const nodeExternals = require('webpack-node-externals')
let externals = []

Object.keys(Components).forEach(key=>{
    externals[`@/components/${key}`] = `universal-component/lib/${key}`
})


externals =  [Object.assign({
    vue: 'vue',
    vuex: 'vuex',
    'lodash': 'lodash',
    'ant-design-vue': 'ant-design-vue',
    'vue-property-decorator': 'vue-property-decorator',
    'vue-class-component': 'vue-class-component',
    'moment': 'moment',
    'pinyin-match': 'pinyin-match',
    'vue-draggable-resizable': 'vue-draggable-resizable',
}, externals), nodeExternals()]

exports.externals = externals

exports.alias = {
    "@": path.resolve(__dirname, "../src/")
}