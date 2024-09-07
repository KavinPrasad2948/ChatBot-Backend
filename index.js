
const WebSocket = require("ws");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const speechToText = require("@google-cloud/speech");
const textToSpeech = require("@google-cloud/text-to-speech");

// Initialize Google Generative AI (Gemini)
const genAI = new GoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY || 'AIzaSyBkAECh4LM-p6XZFIyKog6kMkKkchj8sLs',
});

// Create Speech-to-Text and Text-to-Speech clients
const speechClient = new speechToText.SpeechClient();
const ttsClient = new textToSpeech.TextToSpeechClient();

// WebSocket server setup
const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", async (audioData) => {
    try {
      // 1. Convert audio data (speech) to text using Google Speech-to-Text
      const audioBytes = audioData.toString("base64");
      const [speechResponse] = await speechClient.recognize({
        audio: { content: audioBytes },
        config: { encoding: 'LINEAR16', sampleRateHertz: 16000, languageCode: 'en-US' },
      });

      const text = speechResponse.results
        .map(result => result.alternatives[0].transcript)
        .join("\n");

      console.log("User's message:", text);

      // 2. Send the transcribed text to Google Generative AI (Gemini)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const chat = model.startChat({
        history: [
          { role: "user", parts: [{ text }] }, // Add the user's message
        ],
      });

      const result = await chat.sendMessage("How many paws are in my house?"); // Test question
      const chatResponseText = result.response.text();
      console.log("AI Response:", chatResponseText);

      // 3. Convert the AI's text response to speech using Google Text-to-Speech
      const [ttsResponse] = await ttsClient.synthesizeSpeech({
        input: { text: chatResponseText },
        voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
        audioConfig: { audioEncoding: "MP3" },
      });

      // 4. Send the audio response back to the client as a base64-encoded string
      ws.send(ttsResponse.audioContent.toString("base64"));

    } catch (error) {
      console.error("Error:", error);
      ws.send("An error occurred while processing your request.");
    }
  });

  // Handle disconnection
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:3000");
