# OpenAI integration (sample)

This branch adds a minimal OpenAI (ChatGPT) integration: a small Express backend that proxies requests to the OpenAI API and a simple web UI to test chat.

Branch: feature/openai-integration

Files added:
- backend/server.js — Express server with /api/chat POST endpoint
- backend/package.json — backend dependencies and start script
- web/index.html — minimal UI to send messages
- README.md — setup and usage
- .gitignore

Important: You must set the environment variable OPENAI_API_KEY before starting the server. Example:

  export OPENAI_API_KEY="sk-..."
  cd backend
  npm install
  npm start

Then open web/index.html in a browser and set the API URL to http://localhost:3000/api/chat.
