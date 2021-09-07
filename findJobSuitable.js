const puppeteer = require('puppeteer');
const setTimeOut = require('./timeout');

let jobSuitable = async(job) => {
    const url = job.links;
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 720 });
    await page.tracing.start({
        path: 'tracing.json',
        categories: ['devtools.timeline']
    });
    await page.goto(url);
    //await setTimeOut.deplay(1000);
    // Tao tieu chi cong viec roi loc job => tim ra job phu hop tai day
    await setTimeOut.deplay(1000);
    await page.tracing.stop();
    await browser.close();
    return true
}

module.exports = {
    jobSuitable: jobSuitable
}