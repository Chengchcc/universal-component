import { CommonWidgetProp, FormItemProp } from "../../types/form-item"

export interface RadioGroupWidgetProp extends CommonWidgetProp {}

export type RadioGroupWidgetSchema = FormItemProp<"radio-group", RadioGroupWidgetProp>
