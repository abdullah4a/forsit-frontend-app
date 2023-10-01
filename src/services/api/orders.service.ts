// import API from './handlers/base.service';
import moment from 'moment';
import { orders } from '../json/orders'
const OrdersAPI = {

    getOrderList(params?: Record<string, any>) {
        return new Promise<Array<Record<string, any>>>((resolve) => resolve(orders));
    },
    getTotalNumOfOrders() {
        return new Promise<number>((resolve) => resolve(orders.length));
    },
    placeOrder(payload: any) {
        orders.push(payload)
        return new Promise<Record<string, any>>((resolve) => resolve(payload));
    },
    updateOrder(id: number, payload: any) {
        const index=orders.findIndex(order=>order.id===id)
        if (index>0) {
            orders[index]={...payload}
            return new Promise<Record<string, any>>((resolve) => resolve(payload));
        }
        else
        return new Promise<Record<string, any>>((resolve, reject) => reject("Not Found"))
    },
    withdrawOrder(id: number) {
        const index=orders.findIndex(order=>order.id===id)
        if (index>0) {
            orders.splice(index, 1)
            return new Promise<boolean>((resolve) => resolve(true));
        }
        else
        return new Promise<Record<string, any>>((resolve, reject) => reject("Not Found"))
    },
    getLabeledDataForChart(params?: Record<string, any>){
        const dateMap = {};
        const orderBasedOnParams=getOrdersByParams(params)
        orderBasedOnParams.forEach(order => {
            const orderDate = order.orderDate;
            if (!dateMap[orderDate]) {
                dateMap[orderDate] = 1;
            } else {
                dateMap[orderDate] += 1;
            }
        });
        return new Promise<Record<string, any>>((resolve) => resolve(dateMap));
    }
};
function getOrdersByParams(params?: Record<string, any>){
    if (params){
        const startDate=moment(params['startDate']).format('YYYY-MM-DD')
        const endDate=moment(params['endDate']).format('YYYY-MM-DD')
        return orders.filter((order)=>order.orderDate>startDate&&order.orderDate<endDate)
    }
    return orders
}

export default OrdersAPI;
