# How to Run Your Claude AI App

## Quick Start (Recommended)

1. **Open Terminal 1** and run:
   ```bash
   cd /Users/chriskang/wrapper_app
   python app.py
   ```
   This starts the backend on port 5001

2. **Open Terminal 2** and run:
   ```bash
   cd /Users/chriskang/wrapper_app/wrapper_frontend
   npm start
   ```
   This starts the frontend on port 3000

3. **Open your browser** and go to: `http://localhost:3000`

## Alternative: Use the Script

```bash
cd /Users/chriskang/wrapper_app
./start_claude_app.sh
```

## Troubleshooting

### If you get "port already in use" errors:
1. Stop all processes: `pkill -f "react-scripts" && pkill -f "python app.py"`
2. Wait a few seconds
3. Try starting again

### If you get "npm start" errors:
- Make sure you're in the `wrapper_frontend` directory
- Run: `cd wrapper_frontend && npm start`

### If the backend doesn't work:
- Make sure you're in the main directory (`wrapper_app`)
- Run: `python app.py`

## What You Should See

- **Backend**: "✅ Flask backend is running" on port 5001
- **Frontend**: React app with Claude AI interface on port 3000
- **Features**: Chat interface, conversation history, mobile-responsive design

## URLs

- Frontend: http://localhost:3000
- Backend: http://localhost:5001
- Backend Health Check: http://localhost:5001/ (should show "✅ Flask backend is running") 