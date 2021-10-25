import { CommonWidgetProp, FormItemProp } from "../../types/form-item"

export interface InputWidgetProp extends CommonWidgetProp {}

export type InputWidgetSchema = FormItemProp<"input", InputWidgetProp>
