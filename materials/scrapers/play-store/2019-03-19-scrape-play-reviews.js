const gplay = require('google-play-scraper');

const fs = require('fs')

const app_list = ['co.offtime.kit', 'olsencheung.lockyourphoneproject', 'com.tobiasschuerg.smartphonestats', 'com.antiaddication.innomotion', 'com.goozix.antisocial_personal', 'com.appblockernew', 'com.timelesssky.appgatekeeper', 'com.aozora_create.appofftimer', 'com.a0soft.gphone.uninstaller', 'cz.mobilesoft.appblock', 'de.dfki.appdetox', 'bis.mccaffrey.myfinalyearproject', 'com.incubasys.apptym', 'me.noip.AppUseFree', 'com.adventurize.artiquill', 'com.runnably.bashful', 'notstupid.directsearch', 'com.blackout', 'com.wverlaek.block', 'co.blocksite', 'com.calm.checky', 'com.felixlogic.coldturkey', 'forinnovation.phoneaddiction', 'com.urbandroid.ddc', 'com.Appdesk.MuteIt', 'bg.bozho.dumbphone', 'com.Dyve.Dyve', 'com.kaamchor.android.fameorshame', 'kr.co.rinasoft.yktime', 'com.flipd.app', 'com.lazygeniouz.focus', 'com.NoxfallStudios.StudyCatApp', 'com.curlybrace.ruchir.keepfocusneverprocrastinateagain', 'com.fokison.mobile', 'com.manifest.fomo', 'cc.forestapp', 'com.apps.adrcotfas.goodtime', 'ee.totalstar.gooffline', 'com.andre3.wzlimitdistraction', 'com.apps.dsimpletools.helpmefocus', 'de.cherrypit.idletime', 'com.ifocusmode.phone.addiction', 'com.deGans.itsStudyTime', 'com.jotterpad.x', 'vikesh.dass.lockmeout', 'com.teqtic.lockmeout', 'com.andr.slema.delayedapplock', 'dodolabs.lokeet', 'nl.sidekickmattie.mattie', 'meetingtime.app', 'in.blogspot.alcory.mobileaddictionmeterpro', 'com.it.appstracker', 'com.monitro.android', 'com.assembtec.nodistractions', 'me.aswinmohan.nophone', 'com.offthegrid', 'jp.s122107.phonescreentimer', 'phonesmart.lock.self.control', 'com.ryosoftware.phoneusagemonitor', 'me.noip.PhoneUseFree', 'com.pocketpoints.pocketpoints', 'com.zerodesktop.appdetox.qualitytime', 'com.realizd.android', 'com.rescuetime.android', 'breakingscope.reservelocktimer', 'com.rudraum.antiaddiction', 'com.yoon.mxxxm.selflock', 'co.siempo.phone', 'com.sigismartinnovations.sigismart.FreeWithAds', 'com.agonacat.timekeeper', 'jp.pules.smpjunkiealarm', 'social.lock.com.versionone', 'mrigapps.andriod.breakfree.deux', 'com.stayfocused', 'com.welooksolutions.welook.studysmartfree', 'net.vrforce.substitutephone', 'com.commongivinglabs.terriblydumblauncherpro', 'com.brown.brown.v1', 'ru.towntimer', 'kr.co.rinasoft.howuse', 'com.mmarvick.uc_pro', 'phoneaddiction.easyapps.ms.com.myapplication', 'comslevis13.github.warlock', 'com.mirwanda.webblockerpro', 'com.jamesmc.writer', 'com.mindefy.phoneaddiction.mobilepe', 'io.zenlabs.zenfamily']

const pauseTimeInMS = 60000 // 10,000 ms or 10 seconds.

async function scrapeAllAppReviews(appIDs) {
    let allAppReviews = []
    var date = new Date();
    for (const app of appIDs) {
        let res = await scrapeAppReviews(app);
        await writeReviewsToFile(app, {'app':app, 'numberOfPages': res.numberOfPages, 'reviews':res.reviews});
        allAppReviews.push({
            packageName: app,
            reviews: res.reviews,
            numberOfPages: res.numberOfPages,
            numberOfReviews: res.reviews.length,
            scrapeDate: date
        })
    }
    return allAppReviews;
}

async function scrapeAppReviews(appID) {
    let currReviews = []
    let allReviews = []
    let page = 0
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
    return await gplay.reviews({
        appId: appID, 
        sort: gplay.sort.HELPFULNESS, 
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