# TalentAI — AI-Powered Candidate Screening System

An intelligent talent screening platform built for the **Umurava AI Hackathon**. Uses Google Gemini AI to automatically evaluate and rank candidates against job requirements.

---

## Live Demo

| Service | URL |
|---|---|
| Frontend | _Vercel URL after deploy_ |
| Backend API | _Render URL after deploy_ |

---

## Features

- **AI Screening** — Gemini 2.0 Flash evaluates candidates with weighted scoring (skills, experience, education, projects, availability)
- **Resume Parsing** — Upload PDF resumes and auto-extract structured profiles using AI
- **Bulk Import** — Import candidates via CSV
- **Job Management** — Create and manage job postings with detailed requirements
- **Authentication** — Email/password signup + OAuth via Google, GitHub, and Discord
- **Results Dashboard** — Ranked shortlists with strengths, gaps, and AI-generated interview questions
- **Protected Routes** — All pages require authentication

---

## Tech Stack

### Backend
- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Mongoose)
- **AI**: Google Gemini 2.0 Flash (`@google/generative-ai`)
- **Auth**: JWT (`jsonwebtoken`) + bcrypt
- **File handling**: Multer, pdf-parse, csv-parser

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Auth**: NextAuth v5 (Google, GitHub, Discord, Credentials)
- **State**: Redux Toolkit
- **UI**: Tailwind CSS, Radix UI, Framer Motion, Lucide React
- **HTTP**: Axios

### Infrastructure
- **Backend hosting**: Render
- **Frontend hosting**: Vercel
- **CI/CD**: GitHub Actions
- **Database**: MongoDB Atlas

---

## Project Structure

```
candidate_screening_system/
├── backend/                  # Express API
│   ├── src/
│   │   ├── controllers/      # Route handlers (auth, jobs, candidates, screening)
│   │   ├── middleware/       # JWT auth middleware
│   │   ├── models/           # Mongoose schemas (User, Job, Candidate, ScreeningResult)
│   │   ├── routes/           # API routes
│   │   ├── services/         # Gemini AI service
│   │   └── index.ts          # Server entry point
│   └── .env.example
│
├── frontend/                 # Next.js app
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/       # Login & signup pages (no sidebar)
│   │   │   ├── jobs/         # Job management pages
│   │   │   ├── candidates/   # Candidate management pages
│   │   │   ├── screening/    # AI screening page
│   │   │   └── results/      # Screening results pages
│   │   ├── components/       # Reusable UI components
│   │   ├── store/            # Redux slices
│   │   ├── lib/              # Axios API client
│   │   ├── auth.ts           # NextAuth config
│   │   └── middleware.ts     # Route protection
│   └── .env.local.example
│
├── .github/workflows/
│   ├── ci.yml                # Type-check & build on PRs
│   └── deploy.yml            # Deploy to Render + Vercel on push to main
│
└── render.yaml               # Render service configuration
```

---

## Local Development

### Prerequisites
- Node.js 20+
- MongoDB Atlas account
- Google Gemini API key ([aistudio.google.com](https://aistudio.google.com))

### 1. Clone the repo

```bash
git clone https://github.com/kingblessolivier/candidate_screening_system.git
cd candidate_screening_system
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Fill in `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://...
GEMINI_API_KEY=your_gemini_key
JWT_SECRET=your_secret_min_32_chars
FRONTEND_URL=http://localhost:3000
```

```bash
npm run dev
# API running at http://localhost:5000
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
AUTH_SECRET=any_random_string

# Google OAuth — https://console.cloud.google.com
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# GitHub OAuth — https://github.com/settings/developers
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Discord OAuth — https://discord.com/developers/applications
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
```

```bash
npm run dev
# App running at http://localhost:3000
```

---

## OAuth Setup

| Provider | Callback URL |
|---|---|
| Google | `http://localhost:3000/api/auth/callback/google` |
| GitHub | `http://localhost:3000/api/auth/callback/github` |
| Discord | `http://localhost:3000/api/auth/callback/discord` |

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login, returns JWT |
| POST | `/api/auth/oauth` | Sync OAuth user |
| GET | `/api/auth/me` | Get current user (protected) |

### Jobs
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | List all jobs |
| POST | `/api/jobs` | Create job |
| GET | `/api/jobs/:id` | Get job |
| PUT | `/api/jobs/:id` | Update job |
| DELETE | `/api/jobs/:id` | Delete job |

### Candidates
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/candidates` | List all candidates |
| POST | `/api/candidates` | Create candidate |
| POST | `/api/candidates/bulk` | Bulk import (JSON) |
| DELETE | `/api/candidates/:id` | Delete candidate |
| POST | `/api/candidates/upload/pdf` | Upload PDF resumes (max 50) |
| POST | `/api/candidates/upload/csv` | Upload CSV file |

### Screening
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/screening/run` | Run AI screening |
| GET | `/api/screening` | List results |
| GET | `/api/screening/:id` | Get result |
| GET | `/api/screening/job/:jobId/latest` | Latest result for a job |

---

## Deployment

### GitHub Actions Secrets required

| Secret | Where to get it |
|---|---|
| `RENDER_DEPLOY_HOOK_URL` | Render → service → Settings → Deploy Hook |
| `VERCEL_TOKEN` | vercel.com → Account Settings → Tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json` after `vercel link` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` after `vercel link` |

### Branch strategy
- `develop` — active development, triggers CI checks
- `main` — production, triggers deploy to Render + Vercel
- Direct pushes to `main` are blocked by a local pre-push hook

---

## Branch Protection

A `pre-push` git hook prevents accidental direct pushes to `main`. Always work on `develop` and merge via PR.

```bash
git push origin develop   # ✅ allowed
git push origin main      # ❌ blocked
```

---

## License

MIT
