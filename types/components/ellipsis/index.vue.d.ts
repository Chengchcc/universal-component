import { Vue } from "vue-property-decorator";
export default class IEllipsis extends Vue {
    length: number;
    lines: number;
    tooltip: Boolean;
    renderStrDom(str: string, fullLength: number): JSX.Element;
    renderTooltip(fullStr: string, fullLength: number): JSX.Element;
    showTooltip: boolean;
    renderLines(): JSX.Element;
    render(): JSX.Element;
}
