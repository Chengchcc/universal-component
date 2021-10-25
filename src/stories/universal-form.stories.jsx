import UniversalForm from "@/components/universal-form/index.vue"
import Vue from "vue"

export default {
    title: "Example/通用表单",
    component: UniversalForm,
    argTypes: {}
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { UniversalForm },
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
        return {
            model: {
                radio: "a"
            },
            options1: [
                { value: "1", label: "option1" },
                { value: "2", label: "option2" },
                { value: "3", label: "option3" }
            ],
            cascader_options: [
                {
                    value: "zhejiang",
                    label: "Zhejiang",
                    children: [
                        {
                            value: "hangzhou",
                            label: "Hangzhou",
                            children: [
                                {
                                    value: "xihu",
                                    label: "West Lake"
                                }
                            ]
                        }
                    ]
                },
                {
                    value: "jiangsu",
                    label: "Jiangsu",
                    children: [
                        {
                            value: "nanjing",
                            label: "Nanjing",
                            children: [
                                {
                                    value: "zhonghuamen",
                                    label: "Zhong Hua Men"
                                }
                            ]
                        }
                    ]
                }
            ],
            treeData: [
                {
                    title: "Node1",
                    value: "0-0",
                    key: "0-0",
                    children: [
                        {
                            value: "0-0-1",
                            key: "0-0-1",
                            scopedSlots: {
                                // custom title
                                title: "treeCustomTitle"
                            }
                        },
                        {
                            title: "Child Node2",
                            value: "0-0-2",
                            key: "0-0-2"
                        }
                    ]
                },
                {
                    title: "Node2",
                    value: "0-1",
                    key: "0-1"
                }
            ],
            result: ""
        }
    },
    methods: {
        onClick() {
            this.$refs.form.validate().then(() => {
                this.result = JSON.stringify(this.model, null, 2)
            })
        }
    },
    template: `
            <div class="story-container">
                <universal-form :schema="schema" :mode="mode" v-model="model" ref="form" >
                    <template #text="text, model, schema">
                        I'm scopedSlots {{model}}
                    </template>
                    <template #userPrefix>
                        <a-icon type="user"/>
                    </template>
                    <template #customSlot>
                        <a-select-option value="jack">
                            Jack
                        </a-select-option>
                        <a-select-option value="lucy">
                            Lucy
                        </a-select-option>
                    </template>
                    <template #treeCustomTitle="{value}">
                        Child Node1  {{value}}
                    </template>
                </universal-form>
                <a-button @click="onClick" type="primary" >打印表单</a-button>
                <code style="display: block">
                    {{result}}
                </code>
            </div>
        `
})

export const 填写 = Template.bind({})
填写.args = {
    mode: "vertical",
    schema: [
        {
            label: "姓名",
            dataIndex: "username",
            span: 10,
            type: "input",
            property: {
                placeholder: "请填写"
            },
            slots: {
                prefix: "userPrefix"
            }
        },
        {
            label: "性别",
            dataIndex: "gender",
            span: 10,
            eol: true,
            type: "select",
            property: {
                placeholder: "请填写",
                options: [
                    { label: "男", value: "male" },
                    { label: "女", value: "female" }
                ]
            },
            on: {
                change: function(e) {
                    alert(e)
                }
            }
        },
        {
            label: "动态绑定",
            tips: "动态绑定",
            span: 10,
            dataIndex: "test_multi_select",
            type: "select",
            property: {
                mode: "multiple",
                placeholder: "请选择",
                optionsDynamic: "options1"
            }
        },
        {
            label: "日期",
            span: 10,
            dataIndex: "date",
            type: "date"
        },
        {
            label: "选项",
            span: 10,
            dataIndex: "radio",
            type: "radio-group",
            property: {
                options: [
                    { label: "Hangzhou", value: "a" },
                    { label: "Shanghai", value: "b" },
                    { label: "Beijing", value: "c" }
                ]
            }
        },
        {
            label: "下拉传slot",
            span: 10,
            dataIndex: "test_multi_scope",
            type: "select",
            property: {
                mode: "multiple",
                placeholder: "default通过外部slot传入"
            },
            scopedSlots: { default: "customSlot" }
        },
        {
            label: "级联",
            span: 10,
            dataIndex: "cascader",
            type: "cascader",
            property: {
                optionsDynamic: "cascader_options"
            }
        },
        {
            label: "树形下拉",
            span: 10,
            dataIndex: "tree_select",
            type: "tree-select",
            property: {
                treeDataDynamic: "treeData"
            }
        },
        {
            label: "多行文本",
            span: 10,
            eol: true,
            dataIndex: "input_area",
            type: "input-area",
            dataIndex: "input_multi"
        },
        {
            span: 10,
            label: "customRender",
            dataIndex: "123",
            customRender: (h, text, model, schema) => {
                return <span>{JSON.stringify(model)}</span>
            }
        },
        {
            span: 10,
            label: "scopedSlots",
            scopedSlots: { customRender: "text" }
        }
    ]
}

export const 校验 = Template.bind({})

校验.args = {
    mode: "vertical",
    schema: [
        {
            label: "姓名",
            dataIndex: "username",
            span: 10,
            type: "input",
            property: {
                placeholder: "请填写"
            },
            rules: [{ required: true, message: "必填" }]
        },
        {
            label: "性别",
            dataIndex: "gender",
            span: 10,
            eol: true,
            type: "select",
            property: {
                placeholder: "请填写",
                options: [
                    { label: "男", value: "male" },
                    { label: "女", value: "female" }
                ]
            },
            rules: [{ required: true, message: "必填" }]
        }
    ]
}

export const 动态控制 = Template.bind({})

动态控制.args = {
    mode: "vertical",
    schema: [
        {
            label: "选项",
            span: 10,
            eol: true,
            dataIndex: "radio",
            type: "radio-group",
            property: {
                options: [
                    { label: "Hangzhou", value: "a" },
                    { label: "Shanghai", value: "b" },
                    { label: "Beijing", value: "c" }
                ]
            }
        },
        {
            label: "姓名",
            tips: "选项为Hangzhou时禁用",
            dataIndex: "username",
            span: 10,
            type: "input",
            property: {
                placeholder: "请填写"
            },
            control: {
                trigger: ["radio"],
                handler: function(model, schema, formSchema) {
                    Vue.set(schema.property, "disabled", model["radio"] === "a")
                }
            }
        },
        {
            label: "性别",
            dataIndex: "gender",
            tips: "选项为Shanghai时不展示",
            span: 10,
            eol: true,
            type: "select",
            property: {
                placeholder: "请填写",
                options: [
                    { label: "男", value: "male" },
                    { label: "女", value: "female" }
                ]
            },
            control: {
                trigger: ["radio"],
                handler: function(model, schema, formSchema) {
                    Vue.set(schema, "ignore", model["radio"] === "b")
                }
            }
        }
    ]
}
