import { Vue } from "vue-property-decorator";
export default class IAdvanceButton extends Vue {
    needConfirm: boolean;
    confirmText: string;
    tooltip: string;
    disabled: boolean;
    get props(): import("lodash").Omit<Record<string, any>, "needConfirm" | "confirmText" | "tooltip">;
    renderBtn(): JSX.Element;
    renderPopConfirm(): JSX.Element;
    renderTooltip(): JSX.Element;
    render(): JSX.Element;
}
