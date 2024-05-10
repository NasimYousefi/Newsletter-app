import 'dotenv/config'
import { getRssResult } from './rss.js'
// import { sendTextMail } from './mail.js'
import { sendHtmlMail } from './mail.js'

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

async function sendNewsLetter(){
    try {
        const feeds = await getRssFeeds(rssFeedsUrls);
        const newsBody = feeds.map(item =>{
            return`
            <div style="background-color: #f4f4f4; padding: 20px; border-radius: 10px;">
        <h2 style="margin-bottom: 10px;">${item.title}</h2>
        <p style="margin-bottom: 10px;">Creator: ${item.creator}</p>
        <p style="margin-bottom: 10px;">Publication Date: ${item.pubDate}</p>
        <p style="margin-bottom: 10px;">Provider: ${item.provider.name}</p>
        <p style="margin-bottom: 10px;">Provider Link: <a href="${item.provider.link}">${item.provider.link}</a></p>
        <p style="margin-bottom: 10px;">Provider Language: ${item.provider.language}</p>
        <p style="margin-bottom: 10px;">Provider Last Build Date: ${item.provider.lastBuildDate}</p>
        <p style="margin-bottom: 10px;">Read more: <a href="${item.link}">${item.link}</a></p>
    </div>
            `
        })
        let emailHtml = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">${newsBody}</div>`;
        const mailRecipints = ['nasim.yousefi05@gmail.com']
        const mailResponse = await sendHtmlMail(mailRecipints,'newsLetter',emailHtml)
        return mailResponse;
    } catch (error) {
        console.error(error);
    }
}


sendNewsLetter()
.then(response => console.log(response))
.catch(error => console.error(error))

// getRssFeeds(rssFeedsUrls)
// .then(data => console.log(data))
// .catch(error=>console.error(error))



// sendTextMail(mailRecipints,'newsLetter','Hello Nasim')
// .then(data => console.log(data))
// .catch(error=>console.error(error))

