import { CommonWidgetProp, FormItemProp } from "../../types/form-item"

export interface DateWidgetProp extends CommonWidgetProp {}

export type DateWidgetSchema = FormItemProp<"date", DateWidgetProp>
