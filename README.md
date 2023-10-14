# nodecg-livechat

[![Release](https://img.shields.io/github/v/release/alphaRomeo323/nodecg-livechat?label=Release)](https://github.com/alphaRomeo323/nodecg-livechat/releases)
![License](https://img.shields.io/github/license/alphaRomeo323/nodecg-livechat?label=License)


## TL:DR

This NodeCG-bundle allows you to stream Youtube Live chat in realtime.

### Future

This bundle will be able to stream live chat on other stream platform (ex. Twitch)

## Requirements

- [NodeCG](https://www.nodecg.dev/)

## Installation

In your terminal, please navigate to your root NodeCG folder. Then execute the command `nodecg install alphaRomeo323/nodecg-livechat`.

## Dashboard

### Youtube-Chat

![dashboard](https://cdn.discordapp.com/attachments/636576061932699650/1096524261977497681/Screenshot_20230415_045541.png)

- Radio button: Choose which ID to use to start LiveChat 

  - Channel Id: Recomended

  - Live Id: If you stream with limited, please use it.

- Start/Stop button: Start/Stop LiveChat with selected ID

### Twitch-Chat
![dasboard_2](https://cdn.discordapp.com/attachments/1097097310900596748/1162670827246997586/image.png?ex=653cc896&is=652a5396&hm=c204e33623172459b625288078ea63674b6e280780e25f13960f00a5101b933e&)

- Channel Id: Your Channel name here

- Start/Stop button: Start/Stop anonymous client in selected channel


## Replicant

Replicant name is `chat`

```js
{
  author: 'hogehoge',
  avatar: 'https://yt4.ggpht.com/...',
  message: [ 
    { text: 'thinking' },
    {
      url: 'https://www.youtube.com/s/gaming/emoji/0f0cae22/emoji_u1f914.svg',
      alt: ':thinking_face:',
      isCustomEmoji: false,
      emojiText: '🤔'
    } ],
  platform: "youtube"
}
```

- author: auther of the chat.
- avater: URL of auther's avater
- message:
  - if `platform: youtube`
    - text: raw text
    - url, alt, isCustomEmoji, emojiText: generated when the chat includes some emojis.
  - if `platform: twitch`, raw text
- platform: `youtube` or `twitch`


