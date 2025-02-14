/* const { cmd } = require("../command");
const pkg = require('imgur');
const fs = require('fs');
const path = require('path');

const { ImgurClient } = pkg;
const client = new ImgurClient({ clientId: 'a0113354926015a' });

cmd({
  pattern: "upload",
  alias: ["share"],
  desc: "Upload videos, pictures, or stickers and get a shareable URL.",
  category: "utility",
  use: ".upload (reply to a video, image, or sticker)",
  filename: __filename,
}, async (conn, mek, msg, { from, reply, quoted }) => {
  try {
    if (!quoted) {
      return reply("❌ Please reply to a video, image, or sticker to upload.");
    }

    // Debug: Log the quoted message to inspect its structure
    console.log("Quoted Message:", quoted);

    // Check if the quoted message contains a video, image, or sticker
    const mediaTypes = ['imageMessage', 'videoMessage', 'stickerMessage'];
    if (!mediaTypes.includes(quoted.mtype)) {
      return reply(`❌ Unsupported media type. Detected type: ${quoted.mtype || 'unknown'}`);
    }

    // Download the media file
    const media = await conn.downloadMediaMessage(quoted);
    const filePath = path.join(__dirname, `temp_${Date.now()}.${quoted.mtype === 'stickerMessage' ? 'webp' : quoted.mtype === 'imageMessage' ? 'jpg' : 'mp4'}`);
    fs.writeFileSync(filePath, media);

    // Upload to Imgur
    const imgurUrl = await uploadtoimgur(filePath);

    // Delete the temporary file
    fs.unlinkSync(filePath);

    // Send the URL
    const mediaType = quoted.mtype === 'videoMessage' ? 'Video' : quoted.mtype === 'imageMessage' ? 'Image' : 'Sticker';
    reply(`✅ *${mediaType} Uploaded Successfully!*\n\n🔗 *URL:* ${imgurUrl}`);

  } catch (error) {
    console.error("Error uploading media:", error);
    reply("❌ Failed to upload media. Please try again.");
  }
});

// Function to upload media to Imgur
async function uploadtoimgur(imagepath) {
  try {
    const response = await client.upload({
      image: fs.createReadStream(imagepath),
      type: 'stream',
    });

    let url = response.data.link;
    console.log(url);
    return url;
  } catch (error) {
    console.error('Error uploading image to Imgur:', error);
    throw error;
  }
}

*/
/*const { Telegraph } = require('telegraph');
const fs = require('fs');
const path = require('path');


cmd({
  pattern: "upload",
  alias: ["share"],
  desc: "Upload videos, pictures, or stickers and get a shareable URL.",
  category: "utility",
  use: ".upload (reply to a video, image, or sticker)",
  filename: __filename,
}, async (conn, mek, msg, { from, reply, quoted }) => {
  try {
    if (!quoted) {
      return reply("❌ Please reply to a video, image, or sticker to upload.");
    }

    // Debug: Log the quoted message to inspect its structure
    console.log("Quoted Message:", quoted);

    // Check if the quoted message contains a video, image, or sticker
    const mediaTypes = ['imageMessage', 'videoMessage', 'stickerMessage'];
    if (!mediaTypes.includes(quoted.mtype)) {
      return reply(`❌ Unsupported media type. Detected type: ${quoted.mtype || 'unknown'}`);
    }

    // Download the media file
    const media = await conn.downloadMediaMessage(quoted);
    const filePath = path.join(__dirname, `temp_${Date.now()}.${quoted.mtype === 'stickerMessage' ? 'webp' : quoted.mtype === 'imageMessage' ? 'jpg' : 'mp4'}`);
    fs.writeFileSync(filePath, media);

    // Upload to Telegra.ph
    const telegraph = new Telegraph();
    const uploadResponse = await telegraph.uploadFile(filePath);

    // Delete the temporary file
    fs.unlinkSync(filePath);

    // Send the URL
    const mediaType = quoted.mtype === 'videoMessage' ? 'Video' : quoted.mtype === 'imageMessage' ? 'Image' : 'Sticker';
    reply(`✅ *${mediaType} Uploaded Successfully!*\n\n🔗 *URL:* ${uploadResponse.url}`);

  } catch (error) {
    console.error("Error uploading media:", error);
    reply("❌ Failed to upload media. Please try again.");
  }
});
*/
