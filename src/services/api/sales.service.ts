// import API from './handlers/base.service';
import { sales } from '../json/sales'
const SalesAPI = {

    getSaleList(params) {
        return new Promise<Array<Record<string, any>>>((resolve) => resolve(sales));
    },
    getTotalNumOfSales() {
        return new Promise<number>((resolve) => resolve(sales.length));
    },
    createSale(payload: any) {
        sales.push(payload)
        return new Promise<Record<string, any>>((resolve) => resolve(payload));
    },
    updateSale(id: number, payload: any) {
        const index=sales.findIndex(sale=>sale.id===id)
        if (index>0) {
            sales[index]={...payload}
            return new Promise<Record<string, any>>((resolve) => resolve(payload));
        }
        else
        return new Promise<Record<string, any>>((resolve, reject) => reject("Not Found"))
    },
    deleteSale(id: number) {
        const index=sales.findIndex(sale=>sale.id===id)
        if (index>0) {
            sales.splice(index, 1)
            return new Promise<Boolean>((resolve) => resolve(true));
        }
        else
        return new Promise<Record<string, any>>((resolve, reject) => reject("Not Found"))
    },
};

export default SalesAPI;
