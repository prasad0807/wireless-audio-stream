const WebSocket = require('ws');
const portAudio = require('naudiodon');

// 👇 Put your original Stereo Mix ID here
const DEVICE_ID = -6; 

const wss = new WebSocket.Server({ port: 8080 });
console.log("📡 WebSocket server is waiting for connections on port 8080...");

wss.on('connection', (ws) => {
    console.log("📱 iPhone connected over USB!");

    const audioInput = new portAudio.AudioIO({
        inOptions: {
            channelCount: 2, 
            sampleFormat: portAudio.SampleFormat16Bit,
            sampleRate: 44100, // Back to standard 44.1kHz
            deviceId: DEVICE_ID,
            framesPerBuffer: 256, // Small chunks for low latency
            closeOnError: false
        }
    });

    audioInput.on('data', (audioChunk) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(audioChunk); // Directly send raw PCM bytes
        }
    });

    audioInput.start();
    console.log("🎵 Streaming raw audio over wired connection...");

    ws.on('close', () => {
        console.log("❌ iPhone disconnected.");
        audioInput.quit();
    });
});