import ProductsAPI from "@/services/api/products.service"

export const getProductDataInList=async (field: string)=>{
    const products=await ProductsAPI.getProductsList()
    return products.map(product=>product[field])
}