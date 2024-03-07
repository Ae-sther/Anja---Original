const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ 🐐 | GoatBot V2 ]"; // changing this wont change the goatbot V2 of list cmd it is just a decoyy

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "NTKhang | Aesther", // original author Kshitiz 
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "info",
    guide: {
      en: "{pn} / help cmdName ",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "";

      msg += `[💬»𝘼𝙀-𝙏𝙃𝙀𝙍⚪🔴🔵]\n[(　・ω・)⊃-[二二]𝗟𝗜𝗦𝗧]\n┏━━━━━━━━━┓`// rep𝙡ace with your name 

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += ` \n⋆⋆🌐【 ${category.toUpperCase()} 】🌐⋆⋆`;
const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 3).map((item) => `\n〉🈷️${item}|`);
            msg += ` ${cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length)))}`;
          }

          msg += ``;
        }
      });

      const totalCommands = commands.size;
      msg += `\n\n┗━━━━━━━━━┛🔖𝗧𝗢𝗧𝗔𝗟 𝗖𝗺𝗱 [${totalCommands}📑](◍•ᴗ•◍)\n┏━━━━━━━━━┓\n》𝙲𝚁𝙴𝙰𝚃𝙾𝚁:\n🌊𝘼𝙀𝙎𝙏𝙃𝙀𝙍🏅🌊[𝙂𝙤𝙖𝙩𝙗𝙤𝙩-𝙑𝟮]\n𝙇𝙄𝙉𝙆:https://www.facebook.com/profile.php?id=61555882584314\n In any Request or Problem just type  \n🌱[( ˘▽˘)っ♨!callad]🌱┗━━━━━━━━━┛`;
      msg += ``;
      msg += ``; // its not decoy so change it if you want 

      const helpListImages = [
        "https://i.imgur.com/DDO686J.mp4","https://i.imgur.com/WWGiRvB.mp4",
"https://i.imgur.com/20QmmsT.mp4",
"https://i.imgur.com/nN28Eea.mp4",
"https://i.imgur.com/fknQ3Ut.mp4",
"https://i.imgur.com/yXZJ4A9.mp4",
"https://i.imgur.com/aWIyVpN.mp4",
"https://i.imgur.com/aFIwl8X.mp4",
"https://i.imgur.com/SJ60dUB.mp4",
"https://i.imgur.com/ySu69zS.mp4",
"https://i.imgur.com/mAmwCe6.mp4",
"https://i.imgur.com/Sbztqx2.mp4",
"https://i.imgur.com/s2d0BIK.mp4",
"https://i.imgur.com/rWRfAAZ.mp4",
"https://i.imgur.com/dYLBspd.mp4",
"https://i.imgur.com/HCv8Pfs.mp4",
"https://i.imgur.com/jdVLoxo.mp4",
"https://i.imgur.com/hX3Znez.mp4",
"https://i.imgur.com/cispiyh.mp4",
"https://i.imgur.com/ApOSepp.mp4",
"https://i.imgur.com/lFoNnZZ.mp4",
"https://i.imgur.com/qDsEv1Q.mp4",
"https://i.imgur.com/NjWUgW8.mp4",
"https://i.imgur.com/ViP4uvu.mp4",
"https://i.imgur.com/bim2U8C.mp4",
"https://i.imgur.com/YzlGSlm.mp4",
"https://i.imgur.com/HZpxU7h.mp4",
"https://i.imgur.com/exTO3J4.mp4",
"https://i.imgur.com/Xf6HVcA.mp4",
"https://i.imgur.com/9iOci5S.mp4",
"https://i.imgur.com/6w5tnvs.mp4",
"https://i.imgur.com/1L0DMtl.mp4",
"https://i.imgur.com/7wcQ8eW.mp4",
"https://i.imgur.com/3MBTpM8.mp4",
"https://i.imgur.com/8h1Vgum.mp4",
"https://i.imgur.com/CTcsUZk.mp4",
"https://i.imgur.com/e505Ko2.mp4",
"https://i.imgur.com/3umJ6NL.mp4",

      ];

      const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];

      await message.reply({
        body: msg,
        attachment: await global.utils.getStreamFromURL(helpListImage),
      });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";

        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response = `🦋⃤𝗡𝗔𝗠𝗘⚪🔵🔴\n────────────\n〉[ ${configCommand.name}]\[🦋⃤𝗜𝗡𝗙𝗢⚪🔵🔴]\n--------------------------------------\n〉[𝘥𝘦𝘴𝘤𝘳𝘪𝘱𝘵𝘪𝘰𝘯]:\n▶︎${longDescription}\n〉🔵[𝘖𝘵𝘩𝘦𝘳-𝘯𝘢𝘮𝘦𝘴]:\n▶︎${configCommand.aliases ? configCommand.aliases.join(", ") : "Do not have"} Other names in your group: Do not have\n〉⚪[𝘝𝘦𝘳𝘴𝘪𝘰𝘯]:\n▶︎${configCommand.version || "1.0"}\n〉⚪[𝘙𝘰𝘭𝘦]:\n▶︎${roleText}\n〉⚪𝘛𝘪𝘮𝘦 𝘱𝘦𝘳 𝘤𝘰𝘮𝘮𝘢𝘯𝘥:\n ▶︎${configCommand.countDown || 1}s〉⚪[𝘈𝘶𝘵𝘩𝘰𝘳]:\n▶︎${author}\🦋⃤𝗨𝗦𝗔𝗚𝗘⚪🔵\n────────────\n▶︎ ${usage}\n━━━━━━━━━━━━\n„ಡωಡ„Ae-sther🌱`;

        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (All users)";
    case 1:
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
}
