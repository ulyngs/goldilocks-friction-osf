var store = require('app-store-scraper');

store.reviews({
  appId: 'com.stogaheimllc.BeePresent',
  sort: store.sort.HELPFUL,
  page: 2
})
.then(console.log)
.catch(console.log);