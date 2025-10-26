const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
	config: {
		name: "master",
		version: "1.0",
		author: "Gosk",
		countDown: 5,
		role: 2,
		shortDescription: "sarcasm",
		longDescription: "Responds with random media when someone says 'acs",
		category: "reply",
	},

	onStart: async function () {},

	onChat: async function ({ event, message }) {
		if (event.body && event.body.toLowerCase() === "acs") {
			const mediaLinks = [
				"https://files.catbox.moe/b4q5np.mp4",
				"https://files.catbox.moe/b4q5np.mp4",
				"https://files.catbox.moe/b4q5np.mp4",
				"https://files.catbox.moe/b4q5np.mp4",
				"https://files.catbox.moe/b4q5np.mp4",
				"https://files.catbox.moe/dcs0f8.mp4",
				"https://files.catbox.moe/dcs0f8.mp4",
				"https://files.catbox.moe/a6v1w7.mp4",
				"https://files.catbox.moe/a6v1w7.mp4",
				"https://files.catbox.moe/a6v1w7.mp4"
			];

			const randomLink = mediaLinks[Math.floor(Math.random() * mediaLinks.length)];
			const fileName = path.basename(randomLink);
			const filePath = path.join(__dirname, fileName);

			try {
				const response = await axios.get(randomLink, { responseType: "arraybuffer" });
				fs.writeFileSync(filePath, Buffer.from(response.data));

				await message.reply({
					body: "»̶̶͓͓̽̽̽𝗩𝗔𝗥𝗧𝗨𝗔𝗟𝄞⋆⃝𓊈‎𝗔𝗟𝗟༄𝗠𝗔𝗦𝗧𝗘𝗥𝗠𝗜𝗡𝗗༆✾❥𝗕𝗢𝗫༄🥰🥰",
					attachment: fs.createReadStream(filePath)
				});
			} catch (err) {
				console.error("Failed to fetch media:", err.message);
				await message.reply("Sorry, couldn't load the media.");
			} finally {
				fs.unlink(filePath, () => {});
			}
		}
	}
};
