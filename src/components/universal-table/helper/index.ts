import moment from "moment"

export function getValFromStorage(key: string, defaultVal = {}, needParse = true) {
    try {
        const str = localStorage.getItem(key)
        if (needParse) {
            const obj = JSON.parse(str)
            return obj ?? defaultVal
        }
        return str || defaultVal
    } catch {
        return defaultVal
    }
}

export function setValToStorage(key: string, val: any) {
    if (typeof val === "object") {
        localStorage.setItem(key, JSON.stringify(val))
    } else {
        localStorage.setItem(key, val)
    }
}

export function sum(...args: number[]) {
    return args.reduce((next, n) => next + n, 0)
}

export function tDate(t: any, fmt: string) {
    return moment(t).format(fmt)
}

export function textIsNull(text: any) {
    if (Array.isArray(text)) {
        return text.length === 0
    } else {
        return !text
    }
}
