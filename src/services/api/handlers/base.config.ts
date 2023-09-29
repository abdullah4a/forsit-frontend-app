import { localStorageKeys } from "@/utils/enum/localStorageKeys.enum";
import { generalStorage } from '@/storages/generalStorage'

export default {
    baseURL: process.env.VUE_APP_API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + generalStorage.getLocalItem(localStorageKeys.TOKEN),
    },
};

