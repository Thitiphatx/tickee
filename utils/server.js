// import { CronJob } from 'cron';
// import { autoChangeReceiptStatus, getReceiptDate } from './function';

// var lastCalculation = null;

// const graphTask = new CronJob('*/1 * * * *',async function () {
//     let temp = await getReceiptDate();
//     if (temp) {
//         lastCalculation = temp
//         
//     }
// });
// graphTask.start();

// const changeReceiptStatusTask = new CronJob('*/1 * * * *',async function () {
//     await autoChangeReceiptStatus()
//     
// });
// changeReceiptStatusTask.start();

// export function getLastCalculationResult() {
//     
//     return new Promise((resolve) => {
//         resolve(lastCalculation);
//     });
// }

