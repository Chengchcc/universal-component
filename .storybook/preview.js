import Vue from 'vue'
import Antd from "ant-design-vue"
import "ant-design-vue/dist/antd.css"
import './style.scss'

Vue.use(Antd)


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}