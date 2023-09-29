import { getDynamicColorByValue } from "./getDynamicColorByValue";

export const generateDynamicDataSet=(chartData)=> {
    for (let index = 0; index < chartData.datasets.length; index++) {
        chartData.labels.forEach((_) => {
            const randomSales = Math.floor(Math.random() * 1000) + 100;
            chartData.datasets[index].data.push((randomSales));
            chartData.datasets[index].backgroundColor.push(getDynamicColorByValue(randomSales));
        });
    }
}

