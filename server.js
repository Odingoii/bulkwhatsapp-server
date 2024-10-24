const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const terminalImage = require('terminal-image');
const fs = require('fs');
const path = require('path');

const client = new Client();

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', async qr => {
    const qrImagePath = path.join(__dirname, 'qr.png');

    // Generate a 256x256 QR code image and save it
    await qrcode.toFile(qrImagePath, qr, {
        width: 256,
        margin: 1 // Reduces the margin around the QR code
    });

    // Read the image and display it in the terminal
    const imageBuffer = fs.readFileSync(qrImagePath);
    console.log(await terminalImage.buffer(imageBuffer, { width: '256px' }));
});

client.initialize();
