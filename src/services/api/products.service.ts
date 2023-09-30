// import API from './handlers/base.service';
import { getTotalUniqueProductsQuantities } from '@/helpers/getTotalQuantitiesOfProducts';
import { products } from '../json/products'
const ProductsAPI = {

    getProductsList() {
        return new Promise<Array<Record<string, any>>>((resolve) => resolve(products));
    },
    getTotalNumOfProducts() {
        return new Promise<number>((resolve) => resolve(products.length));
    },
    getQuantityOfProducts() {
        return new Promise<number>((resolve) => resolve(getTotalUniqueProductsQuantities(products)));
    },
    createProducts(payload: any) {
        products.push(payload)
        return new Promise<Record<string, any>>((resolve) => resolve(payload));
    },
    updateProducts(id: number, payload: any) {
        const index=products.findIndex(sale=>sale.product_id===id)
        if (index>0) {
            products[index]={...payload}
            return new Promise<Record<string, any>>((resolve) => resolve(payload));
        }
        else
        return new Promise<Record<string, any>>((resolve, reject) => reject("Not Found"))
    },
    deleteProducts(id: number) {
        const index=products.findIndex(sale=>sale.product_id===id)
        if (index>0) {
            products.splice(index, 1)
            return new Promise<boolean>((resolve) => resolve(true));
        }
        else
        return new Promise<Record<string, any>>((resolve, reject) => reject("Not Found"))
    },
};
export default ProductsAPI;
