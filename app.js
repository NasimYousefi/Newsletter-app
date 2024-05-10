import 'dotenv/config'
import { getRssResult } from './rss.js'

const rssFeedsUrls =[
    'https://bookriot.com/feed/',
'https://www.kirkusreviews.com/feeds/rss/',
]

async function getRssFeeds(feedsUrl){
   const requests = []
    feedsUrl.forEach(url=>{
requests.push(getRssResult(url))
    });

    const feeds = await Promise.all(requests);
    console.log(feeds);

 

}

getRssFeeds(rssFeedsUrls)
.catch(error=>console.error(error))
