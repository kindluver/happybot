








const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('config.env'))
    require('dotenv').config({ path: __dirname + '/config.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'SPARK-X-2025;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUU3S3VicG56WDhrWDdQZUlBMzkwWGxZTVNwUHhWaUpiOC83czBVbWpHcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYkF1SU9rVjdSSGIvUTlNV3dVOVVXZi82L3BFSk9nMDYzWEQ4K01QbXRITT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPTStONDN4RllKT1RpSjJtdWJvSGRrM3V1NHgyR1BhZS9UT2pWdXUxNW5FPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJreFNrS01OaTE5RGVTQk1NcmZCMWx4QjBUbGNqcjBFRXZRRHJZMEY0RWlzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktEZWRDQ0czWmEvMytVSUdPNnBLSGg4TlhpbStVNnZ0OENzUTJHT1dqR009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1qU0pISHNsWWUzSEFqRlQ1dkk1aENiSHJiMVVSSDAvWEJNbzFjaHVUMFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0J2Nk9jcS9hQkwyOGRmZFpvTHNVWGI5WlFYWW1kU3Uvb1JGV1VvMjVuQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicDJHNXVaSzlDVlFudU1MS0JWNjNTZ1gzaUsyK25kaE5ieXZtNklZcURDRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkIwS1JrR1lIVnZsaFhUT0JrRFMxaVhEMnkwZkk1WkJQK1BQcGZQVFBKaFJ6cVQ3ZFNVVUZ0U1VUQTc2MWVac3pHemNXa216am9iYk5reWQxeHkwa2pBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODYsImFkdlNlY3JldEtleSI6Ijd1T3p0QnR2c1p2SVpSQjBhc3l3b1FrUnBIcTEzZnZqTUpaSXR3dDRTbU09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM3NjgxOTg1MzczQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBNEUzQzIzNjcyMEREOUY5NUM0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDU1NTk1NjV9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzNzY4MTk4NTM3M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQUVCNDc4QzIwQzY1QTcwMDEwQyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ1NTU5NTY4fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzc2ODE5ODUzNzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0ExQ0Y1NUIxQzAwNkIwQjgzMjUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NTU1OTU4NH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM3NjgxOTg1MzczQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBQzg1MEIxNTBDNTJCOTkyQzhGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDU1NTk1ODl9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzNzY4MTk4NTM3M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQTAyMjkwNjEzQzg2NTY0NUI1MiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ1NTU5NTg5fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJabnhFUERJR1NFNlJTMnEwRE9XTXJnIiwicGhvbmVJZCI6IjBjYmFhZTYzLTZlODItNDQ3Yi1hYmViLTZhOGI3NzJmN2JkYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPRU9rT3dBWTRZaE50YmtjSTVHM1BnUWZoQlE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM0dOWXIzSjJQejk1YlU4dkp5bFRFZks1YU00PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlBSVkY1TUdRIiwibWUiOnsiaWQiOiIyMzc2ODE5ODUzNzM6MTFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQmVkb3NraW5nIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKbVNuWjhHRVBxL3JNQUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI2akh3ZFc2M3FNeXh5ZzRvUjV6RFR4REhnSGNxK0lnUkZBTGYzek1XbjJ3PSIsImFjY291bnRTaWduYXR1cmUiOiJXc1U2V2QrUlZUTFdIQUcvWVZEUlY4amRVZU1GdldWVmRvNWkydkRiaGZMSUxKaDkvc2J0V0tWZkt2blYvN2ZkQ0UvOXV0TE1EY1M5QXJLOEFsdTdpdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoibkZWWnNIaUdMSDlkZytqbkhlTTVUZ0hCRHBxVWJrMGtrOENIQlpjSjBaaFVYckZuNEtVcGd2ZThUbDB6d0gyNFJtbW90VnZ4dnprbjVQL29DdTBBalE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzc2ODE5ODUzNzM6MTFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZW94OEhWdXQ2ak1zY29PS0VlY3cwOFF4NEIzS3ZpSUVSUUMzOTh6RnA5cyJ9fV0sInBsYXRmb3JtIjoiaXBob25lIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ1NTU5NTU5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUV6LyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "BEDOSKING",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 237681985373",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
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
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_SAVE_CONTACTS_NAME: "SPARK-X", // Default name prefix for new contacts
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
