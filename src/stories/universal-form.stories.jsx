import UniversalForm from "@/components/universal-form/index.vue"
import Vue from "vue"

export default {
    title: "Example/้็จ่กจๅ",
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
                <a-button @click="onClick" type="primary" >ๆๅฐ่กจๅ</a-button>
                <code style="display: block">
                    {{result}}
                </code>
            </div>
        `
})

export const ๅกซๅ = Template.bind({})
ๅกซๅ.args = {
    mode: "vertical",
    schema: [
        {
            label: "ๅงๅ",
            dataIndex: "username",
            span: 10,
            type: "input",
            property: {
                placeholder: "่ฏทๅกซๅ"
            },
            slots: {
                prefix: "userPrefix"
            }
        },
        {
            label: "ๆงๅซ",
            dataIndex: "gender",
            span: 10,
            eol: true,
            type: "select",
            property: {
                placeholder: "่ฏทๅกซๅ",
                options: [
                    { label: "็ท", value: "male" },
                    { label: "ๅฅณ", value: "female" }
                ]
            },
            on: {
                change: function(e) {
                    alert(e)
                }
            }
        },
        {
            label: "ๅจๆ็ปๅฎ",
            tips: "ๅจๆ็ปๅฎ",
            span: 10,
            dataIndex: "test_multi_select",
            type: "select",
            property: {
                mode: "multiple",
                placeholder: "่ฏท้ๆฉ",
                optionsDynamic: "options1"
            }
        },
        {
            label: "ๆฅๆ",
            span: 10,
            dataIndex: "date",
            type: "date"
        },
        {
            label: "้้กน",
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
            label: "ไธๆไผ?slot",
            span: 10,
            dataIndex: "test_multi_scope",
            type: "select",
            property: {
                mode: "multiple",
                placeholder: "default้่ฟๅค้จslotไผ?ๅฅ"
            },
            scopedSlots: { default: "customSlot" }
        },
        {
            label: "็บง่",
            span: 10,
            dataIndex: "cascader",
            type: "cascader",
            property: {
                optionsDynamic: "cascader_options"
            }
        },
        {
            label: "ๆ?ๅฝขไธๆ",
            span: 10,
            dataIndex: "tree_select",
            type: "tree-select",
            property: {
                treeDataDynamic: "treeData"
            }
        },
        {
            label: "ๅค่กๆๆฌ",
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

export const ๆ?ก้ช = Template.bind({})

ๆ?ก้ช.args = {
    mode: "vertical",
    schema: [
        {
            label: "ๅงๅ",
            dataIndex: "username",
            span: 10,
            type: "input",
            property: {
                placeholder: "่ฏทๅกซๅ"
            },
            rules: [{ required: true, message: "ๅฟๅกซ" }]
        },
        {
            label: "ๆงๅซ",
            dataIndex: "gender",
            span: 10,
            eol: true,
            type: "select",
            property: {
                placeholder: "่ฏทๅกซๅ",
                options: [
                    { label: "็ท", value: "male" },
                    { label: "ๅฅณ", value: "female" }
                ]
            },
            rules: [{ required: true, message: "ๅฟๅกซ" }]
        }
    ]
}

export const ๅจๆๆงๅถ = Template.bind({})

ๅจๆๆงๅถ.args = {
    mode: "vertical",
    schema: [
        {
            label: "้้กน",
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
            label: "ๅงๅ",
            tips: "้้กนไธบHangzhouๆถ็ฆ็จ",
            dataIndex: "username",
            span: 10,
            type: "input",
            property: {
                placeholder: "่ฏทๅกซๅ"
            },
            control: {
                trigger: ["radio"],
                handler: function(model, schema, formSchema) {
                    Vue.set(schema.property, "disabled", model["radio"] === "a")
                }
            }
        },
        {
            label: "ๆงๅซ",
            dataIndex: "gender",
            tips: "้้กนไธบShanghaiๆถไธๅฑ็คบ",
            span: 10,
            eol: true,
            type: "select",
            property: {
                placeholder: "่ฏทๅกซๅ",
                options: [
                    { label: "็ท", value: "male" },
                    { label: "ๅฅณ", value: "female" }
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
