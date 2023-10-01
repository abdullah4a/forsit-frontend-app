// import API from './handlers/base.service';
import moment from 'moment';
import { sales } from '../json/sales'
const SalesAPI = {

    getSaleList(params?: Record<string, any>) {
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
        const index = sales.findIndex(sale => sale.id === id)
        if (index > 0) {
            sales[index] = { ...payload }
            return new Promise<Record<string, any>>((resolve) => resolve(payload));
        }
        else
            return new Promise<Record<string, any>>((resolve, reject) => reject("Not Found"))
    },
    deleteSale(id: number) {
        const index = sales.findIndex(sale => sale.id === id)
        if (index > 0) {
            sales.splice(index, 1)
            return new Promise<boolean>((resolve) => resolve(true));
        }
        else
            return new Promise<Record<string, any>>((resolve, reject) => reject("Not Found"))
    },
    getLabeledDataForChart(params?: Record<string, any>) {
        const dateMap = {};
        const parsedSales = getSalesByParams(params)
        parsedSales.forEach(sale => {
            const soldDate = sale.soldDate;
            const totalPrice = Number(sale.totalAmount).toFixed();
            if (!dateMap[soldDate]) {
                dateMap[soldDate] = totalPrice;
            } else {
                dateMap[soldDate] += totalPrice;
            }
        });
        return new Promise<Record<string, any>>((resolve) => resolve(dateMap));
    }
};

function getSalesByParams(params?: Record<string, any>) {
    if (params) {
        const startDate = moment(params['startDate']).format('YYYY-MM-DD')
        const endDate = moment(params['endDate']).format('YYYY-MM-DD')
        return sales.filter((sale) => sale.soldDate > startDate && sale.soldDate < endDate)
    }
    return sales
}

export default SalesAPI;
