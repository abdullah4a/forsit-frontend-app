import { ChartConfig } from "@/types/ChartConfig";
import { generateDynamicDataSet } from "@/helpers/dynamicChartDataSet";


export const chartData: ChartConfig = {
    labels: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
        {
            label: "",
            backgroundColor: [],
            data: [],
        },
        {
            label: "",
            backgroundColor: [],
            data: [],
        },
    ],
}
// @TODO Remove this with real data
generateDynamicDataSet(chartData);
export const chartOptions = {
    responsive: true
}
