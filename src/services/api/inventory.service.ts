// import API from './handlers/base.service';
import { getTotalUniqueProductsQuantities } from '@/helpers/getTotalQuantitiesOfProducts';
import { inventories } from '../json/inventory'
import moment from 'moment';
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
        payload.inventory_id=inventories.length+1
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
    getLabeledDataForChart(params?: Record<string, any>) {
        const dateMap = {};
        const parsedInventory = getSalesByParams(params)
        parsedInventory.forEach(invItem => {
            const productId = `product ${invItem.product_id}`;
            const quantityInStock = Number(invItem.quantity);
            if (!dateMap[productId]) {
                dateMap[productId] = quantityInStock;
            } else {
                dateMap[productId] += quantityInStock;
            }
        });
        return new Promise<Record<string, any>>((resolve) => resolve(dateMap));
    }
};

function getSalesByParams(params?: Record<string, any>) {
    if (params) {
        const startDate = moment(params['startDate']).format('YYYY-MM-DD')
        const endDate = moment(params['endDate']).format('YYYY-MM-DD')
        return inventories.filter((sale) => sale.date_updated > startDate && sale.date_updated < endDate)
    }
    return inventories
}
export default InventoryAPI;
