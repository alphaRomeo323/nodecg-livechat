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

![dashboard](https://cdn.discordapp.com/attachments/636576061932699650/1096524261977497681/Screenshot_20230415_045541.png)

- Radio button: Choose which ID to use to start LiveChat 

  - Channel Id: Recomended

  - Live Id: If you stream with limited, please use it.

- Start/Stop button: Start/Stop LiveChat with selected ID

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
  - text: raw text
  - url, alt, isCustomEmoji, emojiText: generated when the chat includes some emojis.
- platform: for future expansion


