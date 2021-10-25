interface CatchMsgOption {
    prefix?: string
}

interface LoadingMsgOption {
    /**
     * $message.loading 的值
     */
    msg?: string

    /**
     * 上下文中的loading属性名， 若设置则不会展示$message.loading
     */
    loadingProp?: string

    /**
     * 延迟展示loading(ms)
     */
    delay?: number
}

export function catchErrorMsg(option: CatchMsgOption = {}) {
    return function(target: any, key: string | symbol, descriptor: PropertyDescriptor) {
        const fn = descriptor.value
        const prefix = option.prefix || ""
        descriptor.value = async function(...args: any) {
            const ctx = this as any
            try {
                await fn.call(this, ...args)
            } catch (err) {
                const err_ = err as any
                if (err_ && err_.message) {
                    const msg = [err_.message]
                    if (prefix) {
                        msg.unshift(prefix)
                    }
                    ctx.$message.error(msg.join(":"))
                }
                return false
            }
        }
    }
}
/**
 * loading 状态装饰器, 当方法抛错后修正loading态
 * @param { LoadingMsgOption } options
 * @returns
 */
export function loadingStateMsg(options: LoadingMsgOption = {}) {
    return function(target: any, key: string | symbol, descriptor: PropertyDescriptor) {
        const { msg, loadingProp, delay = 500 } = options
        const fn = descriptor.value
        descriptor.value = async function(...args: any) {
            const ctx = this as any
            const loadingExist = typeof ctx[loadingProp] !== "undefined"
            let fire = (): any => void 0
            let timer = null
            if (loadingExist) {
                ctx[loadingProp] = true
            } else {
                timer = setTimeout(() => {
                    fire = ctx.$message.loading(msg, 0)
                }, delay)
            }
            const ret = await fn.call(this, ...args)
            if (loadingExist) {
                ctx[loadingProp] = false
            }
            clearTimeout(timer)
            fire()
            return ret
        }
    }
}
