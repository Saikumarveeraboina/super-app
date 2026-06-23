# 🎬 Super App

A React-based entertainment dashboard application built as a frontend assignment.

## 🚀 Features

### 👤 User Registration
- User Registration Form
- Form Validation
- Local Storage Persistence
- Responsive Design

### 🎭 Category Selection
- Select Entertainment Categories
- Minimum 3 Categories Required
- Dynamic Category Chips
- State Persistence

### 📊 Dashboard
- User Profile Card
- Weather Widget
- News Widget
- Notes Widget
- Countdown Timer

### 🎥 Entertainment Page
- Movies based on selected categories
- Dynamic Movie Posters
- Movie Details Modal
- Responsive Layout

---

## 🛠 Tech Stack

### Frontend
- React JS
- Vite
- React Router DOM

### State Management
- Zustand

### Styling
- CSS3
- Flexbox
- CSS Grid

### APIs
- OpenWeather API
- News API
- OMDB API / TMDB API

### Storage
- LocalStorage

---

## 📁 Folder Structure

```bash
src
│
├── assets
│   ├── images
│   └── icons
│
├── components
│   ├── ProfileCard
│   ├── WeatherCard
│   ├── NewsCard
│   ├── NotesCard
│   ├── TimerCard
│   ├── CategoryCard
│   ├── MovieCard
│   └── MovieModal
│
├── pages
│   ├── Registration
│   ├── Categories
│   ├── Dashboard
│   └── Entertainment
│
├── routes
│   └── AppRoutes.jsx
│
├── services
│   ├── weatherApi.js
│   ├── newsApi.js
│   └── movieApi.js
│
├── store
│   └── useStore.js
│
├── utils
│   ├── validation.js
│   └── localStorage.js
│
├── App.jsx
├── App.css
└── main.jsx
```

---

## ⚙️ Installation

Clone Repository

```bash
git clone https://github.com/yourusername/super-app.git
```

Move into project folder

```bash
cd super-app
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Application runs at

```bash
http://localhost:5173
```

---

## 📦 Required Packages

```bash
npm install react-router-dom
npm install zustand
npm install axios
npm install react-icons
```

---

## 🔑 Environment Variables

Create a `.env` file in project root.

```env
VITE_WEATHER_API_KEY=your_weather_api_key

VITE_NEWS_API_KEY=your_news_api_key

VITE_MOVIE_API_KEY=your_movie_api_key
```

---

## 🌤 Weather API Setup

1. Create account at OpenWeather
2. Generate API Key
3. Add key inside `.env`

Example:

```javascript
const API_KEY =
import.meta.env.VITE_WEATHER_API_KEY;
```

---

## 📰 News API Setup

1. Create account at NewsAPI
2. Generate API Key
3. Add key inside `.env`

---

## 🎬 Movie API Setup

Use either:

### Option 1
OMDB API

### Option 2
TMDB API (Recommended)

---

## 🧠 State Management

Implemented using Zustand.

Store contains:

```javascript
{
  user: {},
  categories: [],
  notes: ""
}
```

---

## 💾 Local Storage

Data persisted:

- User Information
- Selected Categories
- Notes Content

This prevents data loss on refresh.

---

## 🔒 Route Protection

Protected Routes:

```bash
/dashboard
/movies
```

Conditions:

- User must complete registration.
- User must select minimum 3 categories.

---

## 📱 Responsive Design

Supports:

- Desktop
- Tablet
- Mobile

Using:

- CSS Grid
- Flexbox
- Media Queries

---

## 🎯 Assignment Requirements Covered

- React JS
- React Router
- Zustand
- LocalStorage
- API Integration
- Form Validation
- Responsive UI
- Reusable Components
- Clean Code Structure
- Route Protection

---

## 👨‍💻 Author

Sai Kumar

MCA Student | Full Stack Developer
