export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('instrumentation register');
    const cron = await import('cron');
    new cron.CronJob('0 * * * * *', function () {
      console.log('run every 60 seconds - ' + new Date());
    }).start();
  }
}
