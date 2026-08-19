# AUREXA — The Art of the Exceptional (MERN Stack)

A luxury private exhibition and auction platform built strictly on the **MERN Stack** (**M**ongoDB, **E**xpress.js, **R**eact 19, **N**ode.js).

---

## 🏛️ Architecture & Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Database (M)** | **MongoDB / Mongoose** | Stores VIP Invitation Requests, Access Codes, and Private Inquiries. |
| **Backend (E & N)**| **Express.js & Node.js** | RESTful API server (`PORT: 5000`) with CORS, JSON parsing, and Mongoose ORM. |
| **Frontend (R)** | **React 19 + TypeScript** | Built with Vite, Tailwind CSS, GSAP ScrollTrigger, Lenis Smooth Scroll, and Framer Motion. |

---

## 📁 Project Directory Structure

```text
project/
├── backend/                  # Node.js + Express.js + MongoDB API
│   ├── config/
│   │   └── db.js             # Mongoose connection manager
│   ├── models/
│   │   ├── InvitationRequest.js # VIP Guest inquiries schema
│   │   ├── InvitationCode.js    # Access verification schema
│   │   ├── LotInquiry.js        # Private lot bids & reports
│   │   └── StatusCheck.js       # Health check schema
│   ├── routes/
│   │   ├── invitationRoutes.js  # /api/invitations endpoints
│   │   ├── lotRoutes.js         # /api/lots endpoints
│   │   └── statusRoutes.js      # /api status check endpoints
│   ├── .env                  # Backend configuration (PORT=5000, MONGO_URL)
│   ├── package.json          # Express dependencies (express, mongoose, cors, etc.)
│   └── server.js             # Express application entrypoint
│
├── frontend/                 # React 19 + Vite + TypeScript Client
│   ├── src/
│   │   ├── components/       # Editorial UI sections & Radix UI primitives
│   │   ├── data/             # Curated Old Masters & Antiquities catalog
│   │   ├── lib/
│   │   │   ├── api.ts        # Typed Express API client
│   │   │   └── scroll.ts     # Lenis smooth scrolling engine
│   │   ├── App.tsx           # Main application view
│   │   └── main.tsx          # React DOM entry
│   ├── .env                  # Frontend configuration (VITE_API_URL=http://localhost:5000/api)
│   ├── package.json          # React dependencies (vite, gsap, lenis, framer-motion)
│   ├── tailwind.config.js    # Custom luxury editorial palette & styling
│   └── vite.config.ts        # Vite build configuration
│
└── package.json              # Unified root workspace scripts
```

---

## 🚀 Getting Started

### 1. Backend Setup & Run (Port 5000)

```bash
cd backend
npm install
npm start
```
*The Express API will be running on `http://localhost:5000/api`.*

### 2. Frontend Setup & Run (Port 3000)

```bash
cd frontend
npm install
npm start
```
*The React application will open on `http://localhost:3000`.*

---

## 🔌 API Endpoints Reference

- `GET  /api` — API information & available endpoints
- `GET  /api/status` — Database & system health status
- `POST /api/status` — Create status check record
- `POST /api/invitations/request` — Submit private VIP invitation request
- `POST /api/invitations/verify` — Validate invitation code for private gallery admission
- `GET  /api/invitations` — Retrieve submitted invitation requests
- `GET  /api/lots` — List available auction lots and provenance
- `POST /api/lots/:id/inquire` — Lodge a private inquiry or absentee bid on a lot
