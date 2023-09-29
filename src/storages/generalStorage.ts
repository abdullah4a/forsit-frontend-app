import { dataTypeForLocalStorage } from "@/utils/types/localDataType.type";

const getLocalItem = (key: string) => {
    const storedItem = localStorage.getItem(key);
    if (storedItem !== null && storedItem !== undefined) {
        try {
            return JSON.parse(storedItem);
        } catch (err) {
            return storedItem;
        }
    }
    return null;
};

const setLocalItem = (key:string, data: dataTypeForLocalStorage) => {
    if (data === null || data === undefined) {
        localStorage.removeItem(key);
    } else {
        localStorage.setItem(key, JSON.stringify(data));
    }
};
const deleteLocalItem = (key: string) => {
    localStorage.removeItem(key)
}
const deleteAllLocalItems = () => {
    localStorage.clear()
}
export const generalStorage = {
    getLocalItem,
    setLocalItem,
    deleteLocalItem,
    deleteAllLocalItems
}