# 🧠 OPENAI Project

An interactive AI web app built using **React (Vite)** for the frontend and **Node.js + Express** for the backend, powered by the **OpenAI API**.  
Deployed live at 👉 [openai-project-blue.vercel.app](https://openai-project-blue.vercel.app/)

---

## 🚀 Overview

This project demonstrates how to integrate OpenAI’s API with a full-stack web app.  
Users can send prompts through an elegant chat interface — the backend processes requests and fetches intelligent responses from OpenAI’s API, returning them in real-time to the frontend.

---

## 🧱 Tech Stack

**Frontend:**  
- React (with Vite)  
- HTML, CSS, JavaScript  
- React Hooks & Context API  
- Fetch API for backend communication  

**Backend:**  
- Node.js  
- Express.js  
- Mongoose (for handling message threads)  
- dotenv (for environment variables)  
- CORS enabled  

**Other Tools:**  
- Nodemon (for development)  
- Vercel (deployment platform)

---

## 📂 Folder Structure

```
OPENAI_Project/
│
├── Backend/
│   ├── models/
│   │   └── Thread.js        # Mongoose model for storing chat threads
│   ├── routes/
│   │   └── chat.js          # Express route for OpenAI API requests
│   ├── utils/
│   │   └── openAi.js        # Handles OpenAI API calls
│   ├── server.js            # Main Express server
│   ├── package.json
│   └── .gitignore
│
└── Frontend/
    ├── public/
    ├── src/
    │   ├── components/      # UI components (Chat window, Input box, etc.)
    │   ├── context/         # MyContext for managing app state
    │   ├── App.jsx          # Main React app entry point
    |   ├── Sidebar.jsx
    |   ├── ChatWindow.jsx
    |   ├── Chat.jsx
    ├── index.html
    ├── vite.config.js
    ├── package.json
    ├── .env (not committed)
    └── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Ayemen18/OPENAI_Project.git
cd OPENAI_Project
```

### 2. Setup Backend
```bash
cd Backend
npm install
```

Create a `.env` file in the **Backend** directory:
```bash
OPENAI_API_KEY=your_openai_api_key_here
MONGODB_URI=your_mongo_connection_string
```

Start the backend server:
```bash
npm run dev
```

---

### 3. Setup Frontend
```bash
cd ../Frontend
npm install
npm run dev
```

The frontend should start at:
```
http://localhost:5173
```

The backend runs on:
```
http://localhost:8080
```

---

## 🌐 Live Demo

You can try the live version here:  
👉 **[https://openai-project-blue.vercel.app/](https://openai-project-blue.vercel.app/)**

---

## 💬 How It Works

1. The user enters a prompt in the chat UI.  
2. The frontend sends this prompt (and a thread ID) to the backend via an API call.  
3. The backend:
   - Validates input.
   - Checks if a thread exists in MongoDB.
   - Sends the message to OpenAI’s API using the `openAi.js` utility.
   - Returns the AI-generated response.  
4. The frontend displays the response in a conversation format.

---

## 📈 Features

✅ Real-time AI responses  
✅ Chat thread storage via MongoDB  
✅ React Context API for managing global state  
✅ Secure backend API key handling  
✅ Easy local development setup  
✅ Deployed on **Vercel** for global access

---

## 🧰 Available Scripts

### Backend
```bash
npm run dev    # Starts backend with Nodemon
```

### Frontend
```bash
npm run dev    # Starts Vite dev server
npm run build  # Builds production-ready frontend
```

---

## 🛡️ Environment Variables

Both **Frontend** and **Backend** use environment variables.  
Create a `.env` file in the backend with your OpenAI key and database connection string.  
The frontend may include a base URL for API calls if required.

---

## 📡 API Documentation

### Endpoint: `/chat`
**Method:** `POST`  
**Description:** Sends a user prompt and receives an AI-generated response.

#### Request Body:
```json
{
  "threadid": "12345",
  "message": "Explain what artificial intelligence is."
}
```

#### Response Example:
```json
{
  "reply": "Artificial Intelligence (AI) is the simulation of human intelligence processes by machines, especially computer systems..."
}
```

#### Error Responses:
| Code | Message | Description |
|------|----------|-------------|
| 400  | "missing required fields" | threadid or message not provided |
| 500  | "internal server error" | Server or API call failure |

---

## 📦 Deployment Notes

The app is live on **Vercel**.  
If you’re deploying a similar setup:
- Deploy frontend via Vercel (`Frontend/` directory as root).
- Deploy backend separately (Render, Railway, or Vercel Serverless Functions).
- Ensure API endpoints in frontend point to the live backend URL.

---

## 🤝 Contributing

Contributions are welcome!  
If you find bugs or have suggestions:
1. Fork this repo  
2. Create a new branch (`feature-branch`)  
3. Commit changes  
4. Submit a pull request

---

## 🧑‍💻 Author

**Developed by [Ayemen](https://github.com/Ayemen18)**  
Full Stack Developer passionate about learning and building AI-powered web apps.

---

## 🪪 License

This project is licensed under the **MIT License**.

---

### ⭐ Don’t forget to star the repo if you found it useful!
