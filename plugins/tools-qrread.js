const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');
const QrCode = require('qrcode-reader');

cmd({
  pattern: "readqr",
  react: "🤖",
  alias: ["scanqr", "qrread"],
  desc: "Read QR code from an image.",
  category: "utility",
  use: ".readqr (reply to an image containing a QR code)",
  filename: __filename,
}, async (conn, mek, msg, { from, reply, quoted }) => {
  try {
    if (!quoted) {
      return reply("❌ Please reply to an image containing a QR code.");
    }

    // Check if the quoted message is an image
    if (quoted.mtype !== 'imageMessage') {
      return reply("❌ The replied message is not an image. Please reply to an image containing a QR code.");
    }

    // Download the image
    const media = await conn.downloadMediaMessage(quoted);
    const imagePath = path.join(__dirname, `temp_qr_${Date.now()}.jpg`);
    fs.writeFileSync(imagePath, media);

    // Read the image using Jimp
    const image = await Jimp.read(fs.readFileSync(imagePath));

    // Decode the QR code
    const qr = new QrCode();
    const qrData = await new Promise((resolve, reject) => {
      qr.callback = (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      };
      qr.decode(image.bitmap);
    });

    // Delete the temporary image file
    fs.unlinkSync(imagePath);

    // Send the QR code data
    if (qrData.result) {
      reply(`✅ *QR Code Data:*\n\n${qrData.result}`);
    } else {
      reply("❌ No QR code found in the image.");
    }

  } catch (error) {
    console.error("Error reading QR code:", error);
    reply("❌ Failed to read the QR code. Please ensure the image contains a valid QR code.");
  }
});
