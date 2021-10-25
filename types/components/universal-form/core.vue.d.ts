import { Vue } from "vue-property-decorator";
import { FormSchema } from "./types/schema";
import { FormItemSchema } from "./types/form-item";
export default class UniversalFormCore extends Vue {
    schema: FormSchema;
    gutter: any;
    renderItem(schema: FormItemSchema): JSX.Element[];
    render(): JSX.Element;
}
