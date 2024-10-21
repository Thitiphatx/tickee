const cron = require('node-cron');
import { getReceiptDate } from "@/app/admin/fetch";
import { autoChangeReceiptStatus } from "./function";

cron.schedule('0 0 * * *', autoChangeReceiptStatus());

let lastCalculation:{ data:any, yearArray:number[] }|null = null;

cron.schedule('0 0 * * 0', async () => {
    let temp = await getReceiptDate();
    if (temp) {
        lastCalculation =  temp
    }
});

export function getLastCalculationResult() {
    return new Promise((resolve) => {
        resolve(lastCalculation);
    });
}

