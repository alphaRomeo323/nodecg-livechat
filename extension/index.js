const { LiveChat } = require("youtube-chat")

module.exports = async function (nodecg) {
    const activeRep = nodecg.Replicant("youtube-active");
    const channelIdRep = nodecg.Replicant("youtube-channel-id");
    const liveIdRep = nodecg.Replicant("youtube-live-id");
    const selectorRep = nodecg.Replicant("youtube-id-selector");
    const logRep = nodecg.Replicant("youtube-connection-log");
    const chatRep = nodecg.Replicant("chat");
    let activeDate = new Date()
    activeRep.value = false;
    logRep.value = {
        content: "",
        level: "info"
    }

    activeRep.on("change", (newValue) => {
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
            liveChatSeq(liveChat, count);
            
        }
        else if (selectorRep.value === "live" && liveIdRep !== ""){
            const liveChat = new LiveChat({liveId: liveIdRep.value});
            liveChat.start();
            liveChatSeq(liveChat, count);
        }
    }

    const liveChatSeq = ( liveChat ) => {

        liveChat.on("error", (err) => {
            nodecg.log.error(err);
            logRep.value = {
                content: err.message,
                level: "error"
            }
            if(
                err.message.includes("Continuation was not found") 
                || err.message.includes("Cannot read properties of undefined") 
            ){
                activeRep.value = false
            }
        })
    
        liveChat.on("start", (liveId) => {
            nodecg.log.info("Youtube-chat is active")
            logRep.value = {
                content: "Active!",
                level: "info"
            }
        })
        liveChat.on("end", (reason) => {
            if (activeRep.value === false){
                nodecg.log.info("Youtube-chat is stopped");
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
                    nodecg.log.info("Youtube-chat is trying reconnect.");
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

        activeRep.on("change", (newValue) => {
            if (newValue === false){
                liveChat.stop();
            }
        })
    }
}