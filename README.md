#  TalkyAi

TalkyAi is an AI-powered interview simulation and feedback platform built with **Next.js**, **Vapi**, **Gemini**, **MongoDB**, and **Clerk** for authentication. It enables users to conduct mock interviews, receive structured feedback, and improve communication skills through voice and text.

---

## 🚀 Tech Stack

| Layer        | Tools Used                      |
|--------------|----------------------------------|
| Frontend     | Next.js, TailwindCSS             |
| Backend      | Node.js, MongoDB, Vapi SDK       |
| AI Engine    | Gemini (Google AI)               |
| Auth         | Clerk                            |
| Database     | MongoDB Atlas                    |
| Voice Flow   | Vapi SDK                         |

---

# How it looks
![Main page](examplelmages\mainpage.png)
---
![interview](examplelmages\interview.png)
---
![interviewCard](examplelmages\interviewcard.png)
---
![Resposnive](examplelmages\responsive.png)
---



## 🔐 API Keys

Make sure to add your API keys in a `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
GOOGLE_GENERATIVE_AI_API_KEY=""
NEXT_PUBLIC_VAPI_API_KEY=""

