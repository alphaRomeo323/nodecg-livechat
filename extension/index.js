const { LiveChat } = require("youtube-chat")

module.exports = async function (nodecg) {
    const activeRep = nodecg.Replicant("youtube-active");
    const channelIdRep = nodecg.Replicant("youtube-channel-id");
    const liveIdRep = nodecg.Replicant("youtube-live-id");
    const selectorRep = nodecg.Replicant("youtube-id-selector");
    const chatRep = nodecg.Replicant("chat");
    activeRep.value = false;


    activeRep.on("change", (newValue) => {
        if (newValue === true){
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
    })

    const liveChatSeq = ( liveChat ) => {
        const activeDate = new Date()
        liveChat.on("error", (err) => {
            activeRep.value = false;
            nodecg.log.error(err);
        })
    
        liveChat.on("start", (liveId) => {
            nodecg.log.info("Youtube-chat is active")
        })
        liveChat.on("stop", (reason) => {
            nodecg.log.info("Youtube-chat is stopped")
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
                console.log(chatRep.value);
            }
        })
        activeRep.on("change", (newValue) => {
            if (newValue === false){
                liveChat.stop();
            }
        })
    }
}