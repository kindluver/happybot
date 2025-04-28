








const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('config.env'))
    require('dotenv').config({ path: __dirname + '/config.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'SPARK-X-2025;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkQzZXZVUWZuS0twYjVsYlBvcCtoMkl0L2N6ajZ1dUNIelh4M1d1N29HZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicENxRjRhNDB3eXJEcWtRVEpYZlhhTW1DZ05CWVZPamtXaHg1dkF3a3JXND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5R1ZZOWF4NXc1enVmZlRJM3M1YmJnM0RTdzltL1VvdEttUWIzMFJDRVU0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZDVBSjl4RTBCdTFBblNLNlVmTHJCVmNmZUZESWpWR0N3ZjRRWWlCdDBFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktBSHlncy9HckZrUXV3ZHhDY0RpTEk2QTdyeW02TVBYOHpZMXdkZlBqM2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVTdTFzQUFLSVJMZVNGdGVDSkt2alR1eHpWVDhGYm55U0tFRnFPNzBKSEE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkdDQS9JVDNhUTB0cHNQd0d5SXYyZjV6R1k3WC85Y3REclFlZUE5ZGlVWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNTZnc3J0c2dmMVA1SUI2N1E5ZUlNMjBVL0xzMnlPd2JqUk56UVRmOXpoND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldXbjA3KzV1dTh6c0p6MGdKN0xOYjFOOUFXN1I4TmhXTy9NM3VDNTAybEVLSjBuOVhhRmE0ZlBlMkVVQy9OZzJPems2c045UTM1SjMzMWQwODF2OEJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI4LCJhZHZTZWNyZXRLZXkiOiJURWw1MTkrdmJoN2sxMkhPa1ordW9RQTJuM0NlMnNxUy9MRXBHVW16M3gwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNzY3MjU3NDczOEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzNDUxMDAwRTEyRUJGNTU3MUI1MjdCNTBEQkM4Njk4MSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ1ODMxMzA3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzc2NzI1NzQ3MzhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQjdBRjdBMzRDRTBFMTI3QTY3NkQwREVDQkM3QzlBOTAifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NTgzMTQzM30seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM3NjcyNTc0NzM4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjBFNTM5OEMxOUI0RkMxMDNDQTQzMTY1REJGOUZFMTg1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDU4MzE0NzF9XSwibmV4dFByZUtleUlkIjo2MiwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjYyLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkdNYnl5MkpkUTlxQ3Uyd1ZfenRuSVEiLCJwaG9uZUlkIjoiZjhjMzkzZDgtOGI0ZC00ZDdjLTg4ZWItYWU4ODZhYTExMmY2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjgyRFhSbVJaQmJ6Z0txa3pQU3FXdmlmVVZPQT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrTnBmemdDZXBXdHZRd3ZPZnk3Qis0WmgxSjA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiOUxUWkdRWjEiLCJtZSI6eyJpZCI6IjIzNzY3MjU3NDczODo4MEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJoYXBweWRheXMzMTI1In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQblYzdndDRU9LS3ZjQUdHRHNnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJFNW5LUDJtbitodm9YRnZjVTgrWjF3aHpFWXpzL1hQcEg1NHJydmhIMHc0PSIsImFjY291bnRTaWduYXR1cmUiOiJxeDF2YUZxdXJrR3VLZ2cxVzRBWTk1YXh3ME1taW9NMWpwR054RFRIN2UzM2ZhelNFUFJCaWl5ZWoyT3M4bWJzWlVTR3FESk80U0JPRXBKS1h4Y2hDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiaWJuak1EY2dMczJOSWZQRTZpTWo1b1ZIcWd3cG1HSlFEWW1KSjBGejdyZWRRUFhyS3BDK3UrSlo0dk5MTEtCajBmbWNkdW5aQ0xuVFdzUEVPRmN4QXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzc2NzI1NzQ3Mzg6ODBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUk9aeWo5cHAvb2I2RnhiM0ZQUG1kY0ljeEdNN1AxejZSK2VLNjc0UjlNTyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NTgzMTU3NywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFISXcifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "BEDOSKING",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 237672574738",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'SPARK-X-2025',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/h2ydge.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    CHATBO : process.env.CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
    ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
    ANTI_CALL : process.env.ANTI_CALL || 'yes',
                  MENUTYPE : process.env.MENUTYPE || '',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'no',
                  AUTO_BIO : process.env.AUTO_BIO || 'no',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',
                  AUTO_SAVE_CONTACTS_NAME: "kindcont", // Default name prefix for new contacts
                  AUTO_REPLY_MESSAGE: "", 
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
