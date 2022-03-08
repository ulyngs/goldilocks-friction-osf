const gplay = require('google-play-scraper');

const fs = require('fs')

const app_list = ['co.offtime.kit', 'olsencheung.lockyourphoneproject', 'com.tobiasschuerg.smartphonestats', 'com.antiaddication.innomotion', 'com.goozix.antisocial_personal', 'com.appblockernew', 'com.timelesssky.appgatekeeper', 'com.aozora_create.appofftimer', 'com.a0soft.gphone.uninstaller', 'cz.mobilesoft.appblock', 'de.dfki.appdetox', 'bis.mccaffrey.myfinalyearproject', 'com.incubasys.apptym', 'me.noip.AppUseFree', 'com.adventurize.artiquill', 'com.runnably.bashful', 'notstupid.directsearch', 'com.blackout', 'com.wverlaek.block', 'co.blocksite', 'com.calm.checky', 'com.felixlogic.coldturkey', 'forinnovation.phoneaddiction', 'com.urbandroid.ddc', 'com.Appdesk.MuteIt', 'bg.bozho.dumbphone', 'com.Dyve.Dyve', 'com.kaamchor.android.fameorshame', 'kr.co.rinasoft.yktime', 'com.flipd.app', 'com.lazygeniouz.focus', 'com.NoxfallStudios.StudyCatApp', 'com.curlybrace.ruchir.keepfocusneverprocrastinateagain', 'com.fokison.mobile', 'com.manifest.fomo', 'cc.forestapp', 'com.apps.adrcotfas.goodtime', 'ee.totalstar.gooffline', 'com.andre3.wzlimitdistraction', 'com.apps.dsimpletools.helpmefocus', 'de.cherrypit.idletime', 'com.ifocusmode.phone.addiction', 'com.deGans.itsStudyTime', 'com.jotterpad.x', 'vikesh.dass.lockmeout', 'com.teqtic.lockmeout', 'com.andr.slema.delayedapplock', 'dodolabs.lokeet', 'nl.sidekickmattie.mattie', 'meetingtime.app', 'in.blogspot.alcory.mobileaddictionmeterpro', 'com.it.appstracker', 'com.monitro.android', 'com.assembtec.nodistractions', 'me.aswinmohan.nophone', 'com.offthegrid', 'jp.s122107.phonescreentimer', 'phonesmart.lock.self.control', 'com.ryosoftware.phoneusagemonitor', 'me.noip.PhoneUseFree', 'com.pocketpoints.pocketpoints', 'com.zerodesktop.appdetox.qualitytime', 'com.realizd.android', 'com.rescuetime.android', 'breakingscope.reservelocktimer', 'com.rudraum.antiaddiction', 'com.yoon.mxxxm.selflock', 'co.siempo.phone', 'com.sigismartinnovations.sigismart.FreeWithAds', 'com.agonacat.timekeeper', 'jp.pules.smpjunkiealarm', 'social.lock.com.versionone', 'mrigapps.andriod.breakfree.deux', 'com.stayfocused', 'com.welooksolutions.welook.studysmartfree', 'net.vrforce.substitutephone', 'com.commongivinglabs.terriblydumblauncherpro', 'com.brown.brown.v1', 'ru.towntimer', 'kr.co.rinasoft.howuse', 'com.mmarvick.uc_pro', 'phoneaddiction.easyapps.ms.com.myapplication', 'comslevis13.github.warlock', 'com.mirwanda.webblockerpro', 'com.jamesmc.writer', 'com.mindefy.phoneaddiction.mobilepe', 'io.zenlabs.zenfamily'];

function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}

async function main () {
	let results = []

	for (var currApp of app_list) {
		console.log(currApp)

		let currResults = []

		currResults = await gplay.app({
			appId: currApp
		}).catch((err)=>console.log(err))
		
		sleep(1000)
		// console.log(currResults)
		
		results.push({
			app: currApp, 
			scrapeTime: Date(),
			results: currResults,
		})
	}

	fs.writeFile('play_app_meta_data.json', JSON.stringify(results, null, 2), function (err) {
	  if (err) throw err;
	  console.log('Saved!');
	});

}

main()