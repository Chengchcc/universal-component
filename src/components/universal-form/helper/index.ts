export function warning(message: string) {
    // Support uglify
    if (process.env.NODE_ENV !== "production" && console !== undefined) {
        console.error(`Warning: ${message}`)
    }
}
