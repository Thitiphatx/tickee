import { CronJob } from 'cron';
import { autoChangeReceiptStatus, getReceiptDate } from './function';

var lastCalculation = null;

const graphTask = new CronJob('*/1 * * * *',async function () {
    let temp = await getReceiptDate();
    if (temp) {
        lastCalculation = temp
        console.log("graphTask")
    }
});
graphTask.start();

const changeReceiptStatusTask = new CronJob('*/1 * * * *',async function () {
    await autoChangeReceiptStatus()
    console.log("changeRECstatus")
});
changeReceiptStatusTask.start();

export function getLastCalculationResult() {
    console.log("call data function",lastCalculation.data)
    return new Promise((resolve) => {
        resolve(lastCalculation);
    });
}

