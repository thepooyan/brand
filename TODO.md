
more bot options:
- crawler
- test telegram database

future:
- save all of the conversations
- calc based on token
- put token limit ability to users

history {
    add pageination for history
    history filter: user filter has to be dropdown with search
    add every source of talk with bot to history (done: api, widget, telegram, sessionChat | nd: hooshbaan?)
}

make an abstraction to talk with bot
message limit for each user
analytics for message count 
change telegram connection system? (depending on token is a bad thing)
make a better checkbox
test image uploader delete should remove file from s3
rethink plan. message count should not be in there
make the source of all use chat one place. git submodule or node package?
disable logo, and color based on plan
add continue with google 

insider (
    sms (does not work?)
    bank (check if works)
    if bank doesn't work => {
        move to iran.
        - cost gets high
        how to connect to gemini? (get llm service from inside? or use proxy)
        keep sms and add google
    } 
    if bank does work => {
        remove sms add google and username (or make sms work?),
        all set
    }
)

expose useChat as node package 
useChat error handling is buggy
handle error in usechat
fix mini chat
order status page
rate limit s3 uploader for normal users

cron cleaner for otp
?buffer que breaks if there is delay between streamed responsed
profile does not work on could?

seo:
check gsc
expland author => add authors table
Google Search Console
Bing Webmaster Tools
Screaming Frog (crawler)
Ahrefs / SEMrush (analysis)
Schema generators
Static sitemap generators
Framework SEO libraries

services: {
    AI 
        ai chatbot
            telegram
            website widget
            api
            goftoman?
        ai agent
            ?

    Web Design
        normal website 
        pro website

    marketing
        ??
}

***

Final steps:
- finish config
