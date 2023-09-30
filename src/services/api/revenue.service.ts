// import API from './handlers/base.service';
import { revenues } from '../json/revenue'
const RevenueAPI = {

    getRevenueList() {
        return new Promise<Array<Record<string, any>>>((resolve) => resolve(revenues));
    },
    getTotalNumOfRevenue() {
        return new Promise<number>((resolve) => resolve(revenues.length));
    },
    createRevenue(payload: any) {
        revenues.push(payload)
        return new Promise<Record<string, any>>((resolve) => resolve(payload));
    },
    updateRevenue(id: number, payload: any) {
        const revIndex=revenues.findIndex(rev=>rev.id===id)
        if (revIndex>0) {
            revenues[revIndex]={...payload}
            return new Promise<Record<string, any>>((resolve) => resolve(payload));
        }
        else
        return new Promise<Record<string, any>>((resolve, reject) => reject("Not Found"))
    },
    deleteRevenue(id: number) {
        const revIndex=revenues.findIndex(rev=>rev.id===id)
        if (revIndex>0) {
            revenues.splice(revIndex, 1)
            return new Promise<boolean>((resolve) => resolve(true));
        }
        else
        return new Promise<Record<string, any>>((resolve, reject) => reject("Not Found"))
    },
};

export default RevenueAPI;
