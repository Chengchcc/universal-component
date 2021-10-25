import { AxiosInstance } from "axios"

export interface BaseUserInfo {
    avatar: string
    name: string
}
declare module "vue/types/vue" {
    interface Vue {
        $ajax: (type: string) => AxiosInstance
    }

    interface VueConstructor {
        install: (Vue: VueConstructor)=>void
    }
}
