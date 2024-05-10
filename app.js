import 'dotenv/config'
import { getRssResult } from './rss.js'

const rssFeedsUrls =[
    'https://bookriot.com/feed/',

]

async function getRssFeeds(feedsUrl){
   const requests = []
    feedsUrl.forEach(url=>{
requests.push(getRssResult(url))
    });

    const feeds = await Promise.all(requests);
    // console.log(feeds);

    const newsLetter =[]
    feeds.forEach(feed =>{
        feed.items.forEach(item => {
            newsLetter.push({
                title: item.title,
                creator:item.creator,
                link:item.link,
                pubDate:item.pubDate,
                provider:{
                    name:feed.title,
                    link:feed.link,
                    language:feed.language,
                    lastBuildDate:feed.lastBuildDate,
                }
            })
        })
    })
return newsLetter
}

getRssFeeds(rssFeedsUrls)
.then(data => console.log(data))
.catch(error=>console.error(error))
