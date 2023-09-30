export const getTotalUniqueProductsQuantities=(arr: Array<Record<string, any>>) =>{
    const uniqueIdsArr = []
    let totalProducts = 0
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (!uniqueIdsArr.includes(element.product_id)) {
            totalProducts += element.quantity
            uniqueIdsArr.push(element.product_id)
        }
    }

    return totalProducts
}