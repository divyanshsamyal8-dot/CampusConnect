# Campus Connect 🎓

Campus Connect is an all-in-one campus community hub and social platform designed for college students and faculty. It facilitates campus-wide discussions, interest communities, peer messaging, roll-number-based friend discovery, canteen food ordering, and confidential support desk reporting.

---

## 🌟 Key Features

1. **Global Campus Feed**:
   - Post updates, announcements, questions, or ideas.
   - Support for verified student posting (with institutional roll number validation `NNNNANANNN`) or anonymous posting.
   - Tag system (Study, Social, Campus News, Tech, Sports, etc.).
   - Full-text search and tag filtering.
   - Nested comments and threaded replies with like counters and social sharing.

2. **Communities**:
   - Discover, join, and create interest-based campus communities.
   - Real-time community chat streams.
   - Community members roster with instant "Add Friend" actions.

3. **Friends System & Roll Number Validation**:
   - Institutional roll number validation format: `NNNNANANNN` (e.g. `2025A7R025`).
   - Send, accept, or decline friend requests.
   - Seamless integration with posts and community members list.

4. **Private DMs**:
   - Dedicated 1-on-1 private messaging with accepted friends.
   - Dynamic message timestamps and conversation history.

5. **Campus Canteen**:
   - Live food menu categorized into snacks, meals, drinks, desserts, and combos.
   - Cart management with live subtotal calculation and checkout simulation.

6. **Support Desk**:
   - Confidential reporting channel for bullying, emotional support, facility problems, or academic concerns.

7. **Extensible Modular Architecture**:
   - Additional dedicated pages for Q&A, Events, Announcements, Profile Management, and Admin Dashboard.

---

## 🏗️ Architecture & Project Structure

```
CampusConnect/
│
├── frontend/                     # React + Vite Client Application
│   ├── public/                   # Static assets & icons
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── Navbar/           # Responsive top navigation
│   │   │   ├── Sidebar/          # Main sidebar navigation
│   │   │   ├── PostCard/         # Feed post card with comments & reactions
│   │   │   ├── Comment/          # Threaded comments and reply forms
│   │   │   ├── CommunityCard/    # Community cards, chat streams & rosters
│   │   │   ├── EventCard/        # Campus event display cards
│   │   │   ├── Notification/     # Animated badge indicators
│   │   │   └── Modal/            # Modals (Create Post, Profile, etc.)
│   │   ├── context/              # Centralized AppContext with localStorage
│   │   ├── pages/                # Distinct application views (Router)
│   │   ├── styles/               # Modular CSS preserving original animations & styling
│   │   ├── data/                 # Rich initial demo dataset
│   │   ├── utils/                # Helpers (roll validation, gradient generator, storage)
│   │   ├── App.jsx               # Application root layout with ripple effects
│   │   └── main.jsx              # React DOM entry
│   ├── package.json
│   └── vite.config.js
│
├── backend/                      # Node.js + Express REST API Server
│   ├── config/                   # Configuration parameters
│   ├── controllers/              # Request handlers for posts, chats, canteen, etc.
│   ├── routes/                   # Modular route definitions
│   ├── models/                   # Data schemas & types
│   ├── middleware/               # Centralized error handler & request logger
│   ├── services/                 # In-memory storage & persistence layer
│   ├── server.js                 # Express server bootstrap
│   └── package.json
│
├── .env.example
├── .gitignore
├── README.md
└── package.json                  # Root orchestrator for concurrent execution
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

Install all root, frontend, and backend dependencies with a single command:

```bash
npm run install:all
```

Or install them individually:

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install
```

---

## 💻 Running the Application

### Concurrent Development (Recommended)
From the root directory:
```bash
npm run dev
```
This runs both the Express backend (`http://localhost:5000`) and the Vite React frontend (`http://localhost:5173`) concurrently.

### Running Separately

**Frontend Only:**
```bash
cd frontend
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

**Backend Only:**
```bash
cd backend
npm run dev
```
The API server will listen on [http://localhost:5000](http://localhost:5000).

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server health check |
| `GET` | `/api/posts` | Fetch all posts (supports `?search=` and `?tag=`) |
| `POST` | `/api/posts` | Create a new post |
| `POST` | `/api/posts/:id/like` | Toggle like on a post |
| `POST` | `/api/posts/:id/comments` | Add comment or reply to a post |
| `GET` | `/api/communities` | List all communities |
| `POST` | `/api/communities` | Create a new community group |
| `POST` | `/api/communities/:name/join` | Join a community |
| `POST` | `/api/communities/:name/messages` | Send message in community chat |
| `GET` | `/api/friends` | Retrieve user's friends and pending requests |
| `POST` | `/api/friends/request` | Send friend request by roll number |
| `POST` | `/api/friends/accept` | Accept friend request |
| `POST` | `/api/friends/decline` | Decline friend request |
| `DELETE` | `/api/friends/:rollNumber` | Remove a friend |
| `GET` | `/api/canteen/menu` | Get canteen menu items |
| `POST` | `/api/canteen/order` | Place a canteen food order |
| `POST` | `/api/support` | Submit confidential support desk ticket |

---

## 📄 License
MIT License. Built with ❤️ for Campus Connect.
