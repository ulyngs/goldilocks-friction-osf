const store = require('app-store-scraper');

const fs = require('fs')

// couldn't scrape for

const app_list = ['cpimhoff.Tabula.iOS', 'com.masaoyamashita.myfirstapp', 'com.emberify.appusagetracker', 'com.richhenderson.banish', 'com.stogaheimllc.BeePresent', 'com.blacklistapp.Blacklist', 'pabloweb.net.SelfControl', 'com.caramba.phoneuse', 'com.anti-apps.bSociable', 'com.imobiapp.screentimer', 'com.bateman.charityJar', 'nl.schungel.checkout', 'io.magpiedigital.Clar', 'com.getcluster.Compose', 'com.naruthk.DailyNotes', 'org.DinnerMode.ios', 'club.donutdog.ios', 'com.questmobile.draco', 'com.getfeedless.feedless', 'com.riko.suyasaso', 'com.appfinca.flora.ios', 'com.Rave.Focus', 'noxa.Focus', 'com.NextGen.Focus-Drive', 'Guleed-Abdi.FocusApp', 'com.talkingcucumberltd.FocussuPro', 'com.ezoneapps.ForestGrowless', 'com.sen.lim', 'com.jeremy.Goyfaw', 'com.bellostudios.hooked', 'com.bellostudios.hookedpro', 'com.InternetAddiction.Calendar', 'VTT.Just-Write', 'com.jordan-carney.Liberate', 'org.mobpage.markdowneditor', 'com.kevinholesh.Moment', 'to.glued.Mute', 'cn.bahamut.notouchphonealarm', 'com.alexlongerbeam.NoPhone-Timer', 'org.aliyilmaz.notelr', 'com.One-Studio.NoteFlow', 'ru.phoneless.Phoneless', 'com.7CD2H2J37A.moment', 'ca.genoe.Refrain', 'com.imobiapp.screenfree', 'vn.wehelp.SelfControlLite', 'nl.sidekickmattie.sidekickmattie', 'com.yeowjin.simpletext', 'com.lukejmann.SiteBlocker', 'com.seekrtech.sleep', 'com.usedopamine.app.space', 'com.ron.StayFocused', 'com.Milk.milkthemoment', 'com.erichuju.pomodoro', 'io.timeguard.app', 'com.bluecocoa.time2', 'com.globussoft.unhookme', 'com.emberify.unplug2']

const pauseTimeInMS = 10000 // 10,000 ms or 10 seconds.

async function scrapeAllAppReviews(appIDs) {
    let allAppReviews = []
    for (const app of appIDs) {
        let res = await scrapeAppReviews(app);
        await writeReviewsToFile(app, {'app':app, 'numberOfPages': res.numberOfPages, 'reviews':res.reviews});
        allAppReviews.push({
            packageName: app,
            reviews: res.reviews,
            numberOfPages: res.numberOfPages,
            numberOfReviews: res.reviews.length,
            scrapeTime: Date()
        })
    }
    return allAppReviews;
}

async function scrapeAppReviews(appID) {
    let currReviews = []
    let allReviews = []
    let page = 1
    do {
        hasPaused = false;
        const res = await scrapeAppPageReviews(appID, page)
        currReviews = res.reviews
        if(!res.err) {
            allReviews = allReviews.concat(currReviews);
            console.log('Scraped Reviews for:',appID, 'Page Number:', page, 'This Review Count:', currReviews.length, 'Total Review Count:', allReviews.length)
            page += 1
        }
        else {
            console.log('Couldn\'t Scrape reviews for:', appID, 'Page Number:',page)
            console.log('Error Message:', res.err)
            console.log('Shall Save the current reviews for:', appID)
            await writeReviewsToFile(appID, {'app':appID, 'numberOfPages': page, 'reviews':allReviews});
            console.log('Going to Pause scraping for', parseInt(pauseTimeInMS/1000), 'seconds');
            await pause(pauseTimeInMS)
            hasPaused = true;
        }
    }
    while(currReviews.length != 0 || hasPaused)

    return {reviews: allReviews, numberOfPages: page}
}

async function scrapeAppPageReviews(appID, pageNumber) {
    return await store.reviews({
        appId: appID, 
        sort: store.sort.HELPFULNESS, 
        page: pageNumber, 
        throttle: 1,
        country: 'gb'
    }).then((reviews) => {
        return {reviews: reviews, err: null}
    })
    .catch((err)=>{
        return {reviews: [], err: err};
    })
}

function pause(timeInMS){
    return new Promise((resolve,reject) => {
        setTimeout(resolve,timeInMS);
    })
}

async function writeReviewsToFile(fileName, reviews) {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${fileName}.json`, JSON.stringify(reviews, null, 2), (err) => {
            if (err) return reject(err);
            console.log(`Reviews have been saved to: ${fileName}.json`);
            return resolve();
        });
    })
}

async function main () {
    console.log('Scraping reviews for the following apps:', app_list)
    const allReviews = await scrapeAllAppReviews(app_list);
    console.log(allReviews.map((rev) => rev.length))
    await writeReviewsToFile('all_reviews', allReviews);
}


main()