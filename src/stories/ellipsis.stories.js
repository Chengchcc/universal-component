import Ellipsis from "@/components/ellipsis/index.vue"

export default {
    title: "Example/文本自动省略",
    component: Ellipsis,
    argTypes: {}
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { Ellipsis },
    data() {
        return {
            article:
                "There were injuries alleged in three cases in 2015, and a fourth incident in September, according to the safety recall report. After meeting with US regulators in October, the firm decided to issue a voluntary recall."
        }
    },
    template: `
        <div>
            <Ellipsis :tooltip="tooltip" :length="length">
                {{article}}
            </Ellipsis>
        </div>
    `
})

export const length = Template.bind({})
length.args = {
    tooltip: true,
    length: 100
}

export const lines = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { Ellipsis },
    data() {
        return {}
    },
    template: `
    <div style="width: 200px">
        <Ellipsis :tooltip="tooltip" :lines="lines">
            <p>
                There were injuries alleged in three <a href="#cover">cases in 2015</a>, and a fourth incident
                in September, according to the safety recall report. After meeting with US regulators in
                October, the firm decided to issue a voluntary recall.
            </p>
        </Ellipsis>
    </div>
`
})
lines.args = {
    tooltip: true,
    lines: 3
}
