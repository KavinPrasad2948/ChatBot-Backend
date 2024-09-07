
# Backend

## Overview

This is the backend for the chatbot application. It uses Node.js with WebSocket for real-time communication and Google Cloud services for speech-to-text and text-to-speech functionalities.

## Features

- WebSocket server for real-time communication.
- Speech-to-Text conversion using Google Cloud Speech-to-Text.
- Text-to-Speech conversion using Google Cloud Text-to-Speech.
- Integration with Google Generative AI (Gemini) for generating responses.

## Getting Started

### Prerequisites

- Node.js (v18.x or higher)
- Google Cloud API credentials

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/chatbot-backend.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd chatbot-backend
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the root directory and add your Google API key:

   ```env
   GOOGLE_API_KEY=your-google-api-key
   ```

5. **Start the server:**

   ```bash
   npm start
   ```

   The server will start on `ws://localhost:3000`.

## Usage

- **WebSocket Endpoint:** The backend listens for audio data from the frontend via WebSocket.
- **Processing Flow:**
  - **Speech-to-Text:** Converts the incoming audio to text using Google Cloud Speech-to-Text.
  - **Generative AI:** Sends the text to Google Generative AI (Gemini) to generate a response.
  - **Text-to-Speech:** Converts the AI-generated text response back to audio using Google Cloud Text-to-Speech.
  - **Audio Response:** Sends the audio response back to the frontend via WebSocket.

## Example

To test the WebSocket server:

1. Connect to `ws://localhost:3000` using a WebSocket client.
2. Send audio data in a format compatible with the server (e.g., `audio/wav`).
3. Receive the AI-generated audio response from the server.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Cloud for Speech-to-Text and Text-to-Speech APIs.
- Google Generative AI (Gemini) for generating responses.
- WebSocket for real-time communication.
