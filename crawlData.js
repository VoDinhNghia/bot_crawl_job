const puppeteer = require('puppeteer');
const fs = require('fs');
const setTimeOut = require('./timeout');
const jobSuitable = require('./findJobSuitable');
const enterSearch = 'backend nodejs developer';
const url = 'https://itviec.com/';
const city = 'Ho Chi Minh';

(async() => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 720 });
    await page.tracing.start({
        path: 'tracing.json',
        categories: ['devtools.timeline']
    });
    await page.goto(url);
    await setTimeOut.deplay(1000);
    await page.type("input.ui-widget-content.ui-autocomplete-input", enterSearch);
    await setTimeOut.deplay(2000);
    await page.keyboard.down('Enter');
    await page.keyboard.up('Enter');
    await setTimeOut.deplay(1000);

    await page.setDefaultNavigationTimeout(0);
    let listJob = await page.$$eval('div.details', detaiJob => {
        let job = [];
        detaiJob.forEach(item => {
            let title = item.querySelector('h2');
            let linkJob = item.querySelector('a');
            let location = item.querySelector('.city');
            job.push({
                title: title.textContent,
                links: linkJob.href,
                city: location.textContent
            });
        });
        return job;
    });
    //let convertJson = Object.assign({}, listJob);
    console.log(listJob);

    let convertJson = JSON.stringify(listJob);
    fs.writeFileSync('listJobFromITviec.json', convertJson);
    await setTimeOut.deplay(1000);

    // tim cong viec nao phu hop voi cua minh
    let listJobSuitable = [];
    for (let i = 0; i < listJob.length; i++) {
        let checkJob = await jobSuitable.jobSuitable(listJob[i]);
        if (checkJob === true) {
            listJobSuitable.push(listJob[i]);
        }
    }
    console.log(listJobSuitable);
    // tao 1 file send cong viec den gmail
    await setTimeOut.deplay(1000);
    await page.tracing.stop();
    await browser.close();
})()