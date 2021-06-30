const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const moment = require("moment");
const kdb = new db.table("ceza");
exports.run = async (client, message, args) => {
  if (
    !message.member.roles.cache.has("858725570057469953") &&
    !message.member.hasPermission("ADMINISTRATOR")
  )
    return message.channel.send(
      "Bu komutu kullanabilmek için <@&858725570057469953> rolun olması lazım yada `YÖNETİCİ` iznine sahip olmalısın !"
    );
  let kullanıcı = message.mentions.users.first();
  let cezaID = db.get(`cezaid.${message.guild.id}`) + 1;

  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed().setDescription(
        `Bir kullanıcı etiketlemelisin.`
      )
    );
  if (!kullanıcı)
    return message.channel.send(
      new Discord.MessageEmbed().setDescription(
        `**${args[0]}**, kişisini sunucuda bulamıyorum.`
      )
    );

  if (!args[1])
    return message.channel.send(
      new Discord.MessageEmbed().setDescription(
        `Mutenin ne kadar kalacağını belirtmelisin.`
      )
    );
  let süre = args[1];

  if (!args[2])
    return message.channel.send(
      new Discord.MessageEmbed().setDescription(
        `Mutelemek için bir sebep girmelisin.`
      )
    );
  let sebep = args[2];

  let atilanAy = moment(Date.now()).format("MM");
  let atilanSaat = moment(Date.now()).format("HH:mm:ss");
  let atilanGün = moment(Date.now()).format("DD");
  let muteAtılma = `${atilanGün} ${atilanAy
    .replace("01", "Ocak")
    .replace("02", "Şubat")
    .replace("03", "Mart")
    .replace("04", "Nisan")
    .replace("05", "Mayıs")
    .replace("06", "Haziran")
    .replace("07", "Temmuz")
    .replace("08", "Ağustos")
    .replace("09", "Eylül")
    .replace("10", "Ekim")
    .replace("11", "Kasım")
    .replace("12", "Aralık")} ${atilanSaat}`;

  message.guild.members.cache.get(kullanıcı.id).roles.add("859393574108659713");
  db.add(`cezaid.${message.guild.id}`, +1);
  kdb.push(`sicil.${kullanıcı.id}`, {
    userID: kullanıcı.id,
    adminID: message.author.id,
    Tip: "CMUTE",
    start: muteAtılma,
    cezaID: cezaID
  });
  let baslangic = Date.now();
  let bitis = Date.now() + ms(süre);

  let mbd = new Discord.MessageEmbed()
    .setColor("8b0000")
    .setAuthor(
      `[MUTE] ${message.member.user.tag}`,
      message.member.user.displayAvatarURL({ dynamic: true })
    )

    .setDescription(
      `• **Susturulan Kullanıcı** : (\`${kullanıcı.tag}\` - \`${
        kullanıcı.id
      }\`)\n• **Susturan Yetkili** : (\`${message.author.tag}\` - \`${
        message.author.id
      }\`)\n• **Ceza Türü** : \`CHAT_MUTE\`\n• **Susturma Sebebi** : \`${sebep}\`\n• **Susturma Süresi** : \`${süre
        .replace(/d/, " gün")
        .replace(/s/, " saniye")
        .replace(/m/, " dakika")
        .replace(/h/, " saat")}\`\n• **Susturulma Tarihi** : \`${new Date(
        baslangic
      ).toTurkishFormatDate()}\`\n• **Bitiş Tarihi** : \`${new Date(
        bitis
      ).toTurkishFormatDate()}\` \n• **Ceza ID** : \`#${cezaID}\``
    );

  let mutelogh = client.channels.cache.get("841288578763325450");
  client.channels.cache.get(mutelogh.id).send(mbd);

  setTimeout(async () => {
    message.guild.members.cache
      .get(kullanıcı.id)
      .roles.remove("841285926545522708");
    client.channels.cache.get(mutelogh.id).send(
      new Discord.MessageEmbed()
        .setAuthor(
          `[UNMUTE] ${message.member.user.tag}`,
          message.member.user.displayAvatarURL({ dynamic: true })
        )
        .setColor("GREEN")
        .setDescription(
          `(\`${kullanıcı.tag}\` - \`${kullanıcı.id}\`) kullanıcısının (\`${
            message.author.tag
          }\` - \`${
            message.author.id
          }\`) tarafından atılan mutesinin süresi bitti.\n**Susturulma Tarihi** : \`${new Date(
            baslangic
          ).toTurkishFormatDate()}\`\n**Bittiği Tarih** : \`${new Date(
            bitis
          ).toTurkishFormatDate()}\``
        )
    );
  }, ms(süre));
};
exports.ayarlar = {
  durum: true,
  sadeceSunucu: true,
  kisayol: ["sustur", "tempmute", "mute", "Muted", "muted", "Mute"],
  yetkiSeviye: 0
};

exports.kullanim = {
  komut: "mute",
  aciklama: "Kullanıcıyı metin kanallarında susturur."
};