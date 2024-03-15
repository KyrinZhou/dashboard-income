import * as cron from 'cron';

export function schedulefunc() {
  new cron.CronJob('*/10 * * * * *', function () {
    console.log('run every 5 seconds - ' + new Date());
  }).start();
}
