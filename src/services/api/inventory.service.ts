// import API from './handlers/base.service';
import { getTotalUniqueProductsQuantities } from '@/helpers/getTotalQuantitiesOfProducts';
import { inventories } from '../json/inventory'
const InventoryAPI = {

    getInventoryList() {
        return new Promise<Array<Record<string, any>>>((resolve) => resolve(inventories));
    },
    getTotalNumOfInventory() {
        return new Promise<number>((resolve) => resolve(inventories.length));
    },
    getTotalNumOfProductsInInventory() {
        return new Promise<number>((resolve) => resolve(getTotalUniqueProductsQuantities(inventories)));
    },
    createInventory(payload: any) {
        inventories.push(payload)
        return new Promise<Record<string, any>>((resolve) => resolve(payload));
    },
    updateInInventory(id: number, payload: any) {
        const index = inventories.findIndex(inventory => inventory.inventory_id === id)
        if (index > 0) {
            inventories[index] = { ...payload }
            return new Promise<Record<string, any>>((resolve) => resolve(payload));
        }
        else
            return new Promise<Record<string, any>>((resolve, reject) => reject("Not Found"))
    },
    deleteInventory(id: number) {
        const index = inventories.findIndex(inventory => inventory.inventory_id === id)
        if (index > 0) {
            inventories.splice(index, 1)
            return new Promise<boolean>((resolve) => resolve(true));
        }
        else
            return new Promise<Record<string, any>>((resolve, reject) => reject("Not Found"))
    },
};

export default InventoryAPI;
