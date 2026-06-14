# Low-Latency Audio Streaming Engine

A custom Node.js and WebSocket-based audio streaming architecture designed to capture, broadcast, and decode raw Windows system audio to mobile devices in real-time. 

## 🚀 Overview
This project was built to explore low-latency network transmission, audio buffering, and hardware-level audio capture. It bypasses standard Wi-Fi latency bottlenecks by leveraging physical USB Hotspot tethering, resulting in a near-zero latency, crackle-free audio stream directly from a Windows machine to an iOS device.

## 🛠️ Tech Stack
* **Backend:** Node.js, WebSockets (`ws`)
* **Hardware Interfacing:** C++ PortAudio Bindings (`naudiodon`)
* **Frontend:** HTML5, JavaScript (ES6+), Web Audio API
* **Networking:** TCP Protocols, USB Tethering

## 🧠 Architecture & Problem Solving

### 1. Hardware-Level Capture
Standard web APIs cannot easily tap into internal system audio (like "Stereo Mix") on a Windows machine. I utilized `naudiodon` (Node.js bindings for the C++ PortAudio library) to hook directly into the system's soundcard and capture raw 16-bit PCM audio chunks at a 44.1kHz sample rate.

### 2. Network Latency vs. Stability
* **The Problem:** Broadcasting uncompressed PCM audio over standard Wi-Fi introduced noticeable jitter and packet loss, leading to frontend audio stutters.
* **The Solution:** Instead of relying on a highly congested local Wi-Fi router, I routed the WebSocket connection over a direct USB Personal Hotspot link between the mobile device and the PC. This dedicated physical network layer removed dropped packets entirely and dropped latency to practically zero.

### 3. Frontend Buffering
The iOS Safari browser strictly limits background audio and raw packet decoding. I built a custom HTML5 receiver using the Web Audio API that ingests `Int16Array` buffers, normalizes the bit depth, and queues them into a precise `AudioContext` timeline to ensure continuous playback.

## ⚙️ How to Run Locally

1. **Clone the repository:**
   `git clone https://github.com/YourUsername/wireless-audio-stream.git`
   `cd wireless-audio-stream`

2. **Install dependencies:**
   `npm install`
   *(Note: Because this relies on C++ audio bindings, ensure you have Python and standard C++ build tools installed on your Windows machine for node-gyp to compile `naudiodon` correctly).*

3. **Configure the System:**
   * Update the `DEVICE_ID` in `server.js` to match your local machine's "Stereo Mix" index.
   * Update the `LAPTOP_IP` in `receiver.html` to match your active network/USB Hotspot IP address.

4. **Start the servers:**
   `node server.js`
   `node webserver.js`

   Navigate to `http://<YOUR_IP>:3000` on your mobile device and tap "Start Listening".

## 🔮 Future Scope
* **Opus Compression:** Implementing the `@discordjs/opus` encoder to compress raw PCM streams down to 64kbps, making the stream resilient to standard Wi-Fi packet loss without needing the wired USB tether.
* **WebRTC Transition:** Migrating the transport layer from WebSockets (TCP) to WebRTC DataChannels (UDP) for inherent latency optimizations.