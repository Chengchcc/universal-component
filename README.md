# universal-component
基于ant-design-vue二次封装的通用业务组件
包含
- UniversalButton 高级按钮
- UniversalTable 通用表格
- UniversalForm 通用表单
- Ellipsis 文本省略展示组件

## Links
[文档](https://chengchcc.github.io/universal-component)
## Quick Start

需要依赖 ant-design-vue


```jsx
import Vue from 'vue'
import UniComponent from 'universal-component'

Vue.use(UniComponent)

// or
import {
  UniversalTable,
  UniversalButton
  // ...
} from 'universal-component'

Vue.component(UniversalButton.name, UniversalButton)
Vue.component(UniversalTable.name, UniversalTable)

```

## Development
在components添加

运行
```bash
npm run dev
```