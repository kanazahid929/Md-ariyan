const axios = require('axios');

module.exports = {
  config: {
    name: "imgur",
    aliases: ["img", "uploadimg"],
    version: "1.1",
    author: "xnil6x",
    shortDescription: {
      en: "𝗟͟𝗢͟͠𝗔͟𝗗͟𝗜͟͠𝗡͟𝗚͟.͟.͟͠.͟.͟͠.͟.͟͠.͟.͟͠."
    },
    longDescription: {
      en: "✨ Uploads images/videos/GIFs to Imgur and returns the public link"
    },
    category: "utility",
    guide: {
      en: "{p}imgur [reply to media]"
    }
  },

  onStart: async function ({ api, event, message }) {
    try {
      if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
        return message.reply("🔍 Please reply to an image, video, or GIF to upload it to Imgur.");
      }

      const attachment = event.messageReply.attachments[0];
      const fileUrl = attachment.url;

      api.setMessageReaction("🍷", event.messageID, () => {}, true);

      const response = await axios.post(
        "https://api.imgur.com/3/upload",
        { image: fileUrl },
        {
          headers: {
            Authorization: "Bearer 911dc78bc9cf5b7a327227fef7d53abd2585bec5",
            "Content-Type": "application/json"
          }
        }
      );

      const imgurData = response.data.data;

      if (!imgurData.link) {
        throw new Error("No link returned from Imgur");
      }

      api.setMessageReaction("✅", event.messageID, () => {}, true);

      const resultMessage = `
🖼️ 𝗜𝗠𝗚𝗨𝗥 𝗨𝗣𝗟𝗢𝗔𝗗 𝗦𝗨𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹!
👾 𝗢͟𝗪͟͠𝗡𝗘͟𝗥 ⚠️ 𝗩͟𝗜͟͠𝗥𝗨𝗦 🦠 𝘼𝙧𝙞𝙮𝙖𝙣 👑💀
━━━━━━━━━━━━━━
🔗 𝗟𝗶𝗻𝗸: ${imgurData.link}
💽 𝗧𝘆𝗽𝗲: ${imgurData.type}
━━━━━━━━━━━━━━
✨ 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗟͟𝗢͟͠𝗔͟𝗗͟𝗜͟͠𝗡͟𝗚͟.͟.͟͠.͟.͟͠.͟.͟͠.͟.͟͠.
      `;

      message.reply({ body: resultMessage });

    } catch (error) {
      console.error("🔴 Imgur Upload Error:", error);
      api.setMessageReaction("❌", event.messageID, () => {}, true);
      message.reply("⚠️ An error occurred while uploading to Imgur. Please try again later.");
    }
  }
};
