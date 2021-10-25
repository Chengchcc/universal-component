import { CommonWidgetProp, FormItemProp } from "../../types/form-item"

export interface DateRangeWidgetProp extends CommonWidgetProp {}

export type DateRangeWidgetSchema = FormItemProp<"date-range", DateRangeWidgetProp>
