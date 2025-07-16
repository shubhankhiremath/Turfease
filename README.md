# TurfEase

TurfEase is a full-stack web application for booking sports turfs, built with Next.js (frontend), Node.js/Express (backend), and MongoDB Atlas (database). It provides a modern, responsive UI and robust features for users and admins.

## Features
- **User Authentication:** Secure login/signup, session management.
- **Turf Listings:** Browse, search, and view detailed information about available turfs.
- **Booking System:** Book turfs for specific dates/times, view upcoming and past bookings.
- **Admin Panel:** Manage turfs, view all bookings, and handle user management (if enabled).
- **Responsive Design:** Works seamlessly on desktop and mobile devices.
- **Modern UI:** Built with Tailwind CSS and React components for a clean, user-friendly experience.

## Tech Stack
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (cloud-hosted)
- **Authentication:** JWT or session-based (see code for details)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm, pnpm, or yarn
- MongoDB Atlas account (or local MongoDB for development)

### Installation
1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd TurfEase_Final
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env.local` and fill in your MongoDB URI and any other required secrets.

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).



## Project Structure
- `app/` - Next.js app directory (pages, layouts, etc.)
- `components/` - Reusable React components
- `contexts/` - React context providers (e.g., auth)
- `backend/` - Express.js backend API (if present)
- `lib/`, `hooks/`, `styles/` - Utilities, custom hooks, and global styles



---

**TurfEase** – Book your game, hassle-free! 