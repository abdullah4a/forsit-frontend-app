import { inventories } from "@/services/json/inventory";

// import InventoryAPI from "@/services/api/inventory.service";
export const getProductWithLowStacks= ()=>{
    // const inventories = await InventoryAPI.getInventoryList();
    inventories.sort((a, b) => new Date(b.date_updated).getDate() - new Date(a.date_updated).getDate());    
    return inventories[0];
}