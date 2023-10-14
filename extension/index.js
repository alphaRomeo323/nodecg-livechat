const { LiveChat } = require("youtube-chat")
const tmi = require("tmi.js");
const { node } = require("webpack");

module.exports = async function (nodecg) {
    const youtubeActiveRep = nodecg.Replicant("youtube-active");
    const channelIdRep = nodecg.Replicant("youtube-channel-id");
    const liveIdRep = nodecg.Replicant("youtube-live-id");
    const selectorRep = nodecg.Replicant("youtube-id-selector");
    const logRep = nodecg.Replicant("youtube-connection-log");
    const twitchChannelRep = nodecg.Replicant("twitch-channel-id");
    const twitchActiveRep = nodecg.Replicant("twitch-active");
    const chatRep = nodecg.Replicant("chat");
    
    let activeDate = new Date()
    youtubeActiveRep.value = false;
    twitchActiveRep.value = false;
    logRep.value = {
        content: "",
        level: "info"
    }

    youtubeActiveRep.on("change", (newValue) => {
        if (newValue === true){
            logRep.value = {
                content: "connecting...",
                level: "info"
            }
            activeDate = new Date()
            connectYoutubeStream();
        }
    })

    const connectYoutubeStream = () => {
        if (selectorRep.value === "channel" && channelIdRep !== ""){
            const liveChat = new LiveChat({channelId: channelIdRep.value});
            liveChat.start();
            liveChatSeq(liveChat);
            
        }
        else if (selectorRep.value === "live" && liveIdRep !== ""){
            const liveChat = new LiveChat({liveId: liveIdRep.value});
            liveChat.start();
            liveChatSeq(liveChat);
        }
    }

    const liveChatSeq = ( liveChat ) => {

        liveChat.on("error", (err) => {
            nodecg.log.error(err.message);
            if(
                err.message.includes("not found") 
                || err.message.includes("Cannot read properties of undefined")
                || err.message.includes("404") 
            ){
                logRep.value = {
                    content: err.message,
                    level: "error"
                }
                youtubeActiveRep.value = false
            }
        })
    
        liveChat.on("start", (liveId) => {
            nodecg.log.info("Youtube-chat is active!")
            nodecg.log.info(`LiveId: ${liveId}`)
            logRep.value = {
                content: "Active!",
                level: "info"
            }
        })
        liveChat.on("end", (reason) => {
            if (youtubeActiveRep.value === false){
                nodecg.log.info("Youtube-chat is stopped.");
                if (logRep.value.level === "info"){
                    logRep.value = {
                        content: "",
                        level: "info"
                    }
                }
            }
            else{
                activeDate = new Date()
                setTimeout(() => {
                    nodecg.log.warn("Youtube-chat is trying reconnection.");
                    logRep.value = {
                        content: "Reconnecting...",
                        level: "info"
                    }
                    connectYoutubeStream();
                },1000);
            }
        })
    
        liveChat.on("chat", (chatItem) => {
            const chatDate = new Date(chatItem.timestamp);
            if (chatDate - activeDate > 0){
                chatRep.value = {
                    author: chatItem.author.name,
                    avatar: chatItem.author.thumbnail.url,
                    message: chatItem.message,
                    platform: "youtube"
                }
            }
        })

        youtubeActiveRep.on("change", (newValue) => {
            if (newValue === false){
                liveChat.stop();
            }
        })
    }

    twitchActiveRep.on("change", (newValue) => {
        if (newValue === true){
            const client = new tmi.Client({
                channels: [ twitchChannelRep.value ]
            });
            client.connect();
            twitchClientSeq(client);
            
        }
    })

    const twitchClientSeq = ( client ) => {
        client.on('message', (channel, tags, message, self) => {
            chatRep.value = {
                author: tags['display-name'],
                avatar: "",
                message: message,
                platform: "twitch"
            }
    
        });
        twitchActiveRep.on("change", (newValue) => {
            if (newValue === false){
                client.disconnect()
            }
        })
    }
}
