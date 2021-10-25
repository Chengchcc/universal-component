interface CatchMsgOption {
    prefix?: string;
}
interface LoadingMsgOption {
    /**
     * $message.loading 的值
     */
    msg?: string;
    /**
     * 上下文中的loading属性名， 若设置则不会展示$message.loading
     */
    loadingProp?: string;
    /**
     * 延迟展示loading(ms)
     */
    delay?: number;
}
export declare function catchErrorMsg(option?: CatchMsgOption): (target: any, key: string | symbol, descriptor: PropertyDescriptor) => void;
/**
 * loading 状态装饰器, 当方法抛错后修正loading态
 * @param { LoadingMsgOption } options
 * @returns
 */
export declare function loadingStateMsg(options?: LoadingMsgOption): (target: any, key: string | symbol, descriptor: PropertyDescriptor) => void;
export {};
