import { Vue } from "vue-property-decorator";
import { ColumnAction } from "../../types/action";
export default class IActionsPanel extends Vue {
    actions: ColumnAction[];
    limit: number;
    record: any;
    /**
     * 是否是链接按钮
     */
    isLink: boolean;
    /**
     * 是否展示分割符
     */
    showDivider: boolean;
    renderAction(action: ColumnAction): JSX.Element;
    dropDownVisible: boolean;
    renderDropDown(actions: ColumnAction[]): JSX.Element;
    render(): JSX.Element;
}
