module.exports.config = {
  name: "automs",
  version: "1.0",
  hasPermssion: 0,
  credits: "BOSS11",
  description: "নির্দিষ্ট গ্রুপে প্রতি ৫ সেকেন্ডে অটো মেসেজ পাঠাবে",
  commandCategory: "System",
  usages: "[on/off] [groupID]",
  cooldowns: 5,
};

let timers = {};

module.exports.run = async function({ api, event, args }) {
  const [action, groupID] = args;

  if (!action || !["on", "off"].includes(action)) {
    return api.sendMessage("প্রথম আর্গুমেন্টে 'on' অথবা 'off' দিন।", event.threadID);
  }

  if (!groupID) {
    return api.sendMessage("গ্রুপ আইডি দিতে হবে!", event.threadID);
  }

  if (action === "on") {
    if (timers[groupID]) {
      return api.sendMessage("এই গ্রুপের জন্য অটো মেসেজ ইতিমধ্যে চালু আছে!", event.threadID);
    }

    timers[groupID] = setInterval(() => {
      api.sendMessage("এটি একটি অটো মেসেজ, প্রতি ৫ সেকেন্ডে পাঠানো হচ্ছে।", groupID).catch(console.error);
    }, 5000);

    return api.sendMessage(`অটো মেসেজ চালু করা হলো গ্রুপ: ${groupID}`, event.threadID);
  }

  if (action === "off") {
    if (!timers[groupID]) {
      return api.sendMessage("এই গ্রুপে কোন অটো মেসেজ চালু নেই!", event.threadID);
    }

    clearInterval(timers[groupID]);
    delete timers[groupID];

    return api.sendMessage(`অটো মেসেজ বন্ধ করা হলো গ্রুপ: ${groupID}`, event.threadID);
  }
};
