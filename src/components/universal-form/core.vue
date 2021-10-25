<script lang="tsx">
import { Vue, Component, Prop } from "vue-property-decorator"
import { FormSchema } from "./types/schema"
import FormItem from "./form-item.vue"
import { FormItemSchema } from "./types/form-item"
@Component({
    components: {
        FormItem
    }
})
export default class UniversalFormCore extends Vue {
    @Prop()
    schema: FormSchema

    @Prop()
    gutter: any

    renderItem(schema: FormItemSchema) {
        const { span, offset, dataIndex, eol } = schema
        const nodes = [
            <a-col span={span} offset={offset} key={dataIndex}>
                <form-item schema={schema} />
            </a-col>
        ]
        if (eol) {
            nodes.push(<a-col span={24} key={dataIndex + "_eof"} />)
        }
        return nodes
    }

    render() {
        return (
            <a-row gutter={this.gutter}>
                {this.schema
                    .filter(s => s.ignore !== true)
                    .map(s => {
                        return this.renderItem(s)
                    })}
            </a-row>
        )
    }
}
</script>
