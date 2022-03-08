# Data notes

- the file materials/2018-12-30_lyngs_tools.csv is **data/data_processed/4_tool_feature_review/ul_dec30_recoding_all.csv**, with (a) tool ids joined from the files **data/data_processed/3_detailed_screening/phase2_REVIEWED_apple_apps.xlsx** and **data/data_processed/3_detailed_screening/phase2_REVIEWED_google_play.xlsx**, and (b) tool ids for Chrome Web tool simplified to the unique identifier at the end of its URL (last string of characters after / and before the language code, e.g. ?hl=gb)

# How to use
## Scrapers 
### Apple App Store
#### Scraping with the github scraper
Uses the scraper from https://github.com/facundoolano/app-store-scraper

To use it: 

1. open a terminal in the materials/scrapers/apple-app-store/github-scraper folder
2. run the command `npm install app-store-scraper` (make sure you have an installation of `node.js` and `npm` on your system)
3. test that it works by running the command `node test.js`
4. scrape meta data for the app store apps by running the command `node 2019-03-19-scrape_metadata.js` -- the data will be stored in the **github-scraper** folder as **apple_DSCT_meta_data.json**

#### Scraping with our R scraper

### Google Play Store
#### Scraping with the github scraper
Uses the scraper from https://github.com/facundoolano/google-play-scraper

To use it: 


1. open a terminal in the materials/scrapers/play-store/ folder
2. run the command `npm install google-play-scraper` (make sure you have an installation of `node.js` and `npm` on your system)
3. test that it works by running the command `node test.js`
4. scrape meta data for the play store apps by running the command `node 2019-03-19-scrape-play-metadata.js` -- the data will be stored in the **materials/scrapers/play-store/** folder
4. scrape reviews for the play store apps by running the command `node 2019-03-19-scrape-play-reviews.js` -- the data will be stored in the **materials/scrapers/play-store/** folder

### Chrome Web store

- To scrape meta data, open **materials/scrapers/chrome-web/chrome_ext_info_scraper.Rmd** in RStudio and run the code chunks from top to bottom (follow the documentation)
- To scrape meta data, open **materials/scrapers/chrome-web/chrome_review_scraper.Rmd** in RStudio and run the code chunks from top to bottom (follow the documentation in there)