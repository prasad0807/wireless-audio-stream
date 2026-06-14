const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;

// When the iPhone visits the main page, hand it the receiver.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'receiver.html'));
});

// Start the server and listen on all local network interfaces ('0.0.0.0')
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🌐 Web server is live!`);
    console.log(`📱 On your iPhone Safari, go to this exact URL:`);
    console.log(`👉 http://[YOUR_LAPTOP_IP]:${PORT}\n`);
    console.log(`(Replace [YOUR_LAPTOP_IP] with the address you used in receiver.html)`);
});