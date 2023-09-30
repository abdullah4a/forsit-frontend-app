// import API from './handlers/base.service';
import { orders } from '../json/orders'
const OrdersAPI = {

    getOrderList() {
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
};

export default OrdersAPI;
