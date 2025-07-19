# ChatGPT Wrapper App

A full-stack application that provides a beautiful web interface for interacting with OpenAI's ChatGPT API.

## Features

- 🤖 **ChatGPT Integration**: Powered by OpenAI's GPT-3.5-turbo model
- 🎨 **Modern UI**: Beautiful, responsive design with gradient backgrounds
- ⚡ **Real-time Chat**: Instant responses from the AI
- 🔧 **Easy Setup**: Simple configuration and deployment

## Prerequisites

- Python 3.7+
- Node.js 14+
- OpenAI API key

## Setup

### 1. Clone and Install Dependencies

```bash
# Install Python dependencies
pip install -r requirements.txt

# Install React dependencies
cd wrapper_frontend
npm install
cd ..
```

### 2. Configure OpenAI API Key

Create a `.env` file in the root directory:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

You can get your API key from [OpenAI's platform](https://platform.openai.com/api-keys).

### 3. Start the Application

#### Option A: Use the convenience script (Recommended)
```bash
./start_services.sh
```

#### Option B: Start services manually

**Terminal 1 - Backend:**
```bash
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd wrapper_frontend
npm start
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Type your message in the text area
3. Click "Send" or press Enter to get a response from ChatGPT
4. The response will appear below the input area

## Architecture

- **Backend**: Flask server running on port 5001
  - Handles API requests to OpenAI
  - Provides CORS support for frontend
  - Error handling and rate limiting

- **Frontend**: React app running on port 3000
  - Modern, responsive UI
  - Real-time communication with backend
  - Loading states and error handling

## API Endpoints

- `GET /` - Health check endpoint
- `POST /chat` - Send message to ChatGPT
  - Body: `{"message": "your message here"}`
  - Returns: `{"response": "AI response"}`

## Troubleshooting

### Common Issues

1. **"Failed to connect to backend"**
   - Make sure the Flask server is running on port 5001
   - Check that the backend URL in `App.js` matches your server port

2. **"OpenAI API key not configured"**
   - Ensure your `.env` file exists and contains the correct API key
   - Restart the backend server after adding the API key

3. **CORS errors**
   - The backend is configured to allow requests from `localhost:3000`
   - If using a different port, update the CORS configuration in `app.py`

### Port Configuration

- Backend: Port 5001 (configurable in `app.py`)
- Frontend: Port 3000 (configurable in `package.json`)

## Development

### Backend Development
- The Flask app uses debug mode for development
- API responses include detailed error messages
- Logs are printed to the console

### Frontend Development
- React app with hot reloading enabled
- CSS modules for styling
- Responsive design for mobile and desktop

## License

This project is open source and available under the MIT License.