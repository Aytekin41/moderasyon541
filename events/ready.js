const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile başlatıldı.`);
  client.user.setStatus("dnd");
 client.user.setStatus('idle')


 client.user.setActivity(`Chapo 💜 Zenard`,  { type: `WATCHING` })

};
