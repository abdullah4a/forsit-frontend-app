import { sales } from './../services/json/sales';
import ProductsAPI from '@/services/api/products.service';
export const getMaxAndMinSoldProducts =async  () => {
    const maxSold=await ProductsAPI.getProductById(getMostSold().mostSold.product_id)
    const minSold=await ProductsAPI.getProductById(getMostSold().leastSold.product_id)
    return {maxSold, minSold}
}
const getMostSold = () => {
    const productSales = {};
    sales.forEach(sale => {
        const productId = sale.product_id;
        const quantity = sale.quantity;

        if (!productSales[productId]) {
            productSales[productId] = quantity;
        } else {
            productSales[productId] += quantity;
        }
    });
    const productsWithSales = Object.keys(productSales).map(productId => ({
        product_id: parseInt(productId),
        totalSales: productSales[productId],
    }));

    productsWithSales.sort((a, b) => b.totalSales - a.totalSales);
    return {mostSold:productsWithSales[0], leastSold: productsWithSales[productsWithSales.length-1]}
}