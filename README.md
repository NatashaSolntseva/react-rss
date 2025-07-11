# 🖼️ Unsplash Image Search App

A React app built with Vite, using class components, Tailwind CSS, ESLint, Prettier, and Husky.  
The app allows users to search for images from the [Unsplash API](https://unsplash.com/documentation) and view the latest photos.

---

## 🌐 Live Demo

🔗 [Demo](https://heroic-raindrop-383d50.netlify.app/)

---

## 🚀 Features

- 🔍 Search photos by keyword
- 🖼️ Display latest 6 photos on load
- 💾 Store last search term in `localStorage`
- 💥 Global error boundary with test error button
- 🧹 Code quality tools: ESLint, Prettier, Husky
- 💅 Styled with Tailwind CSS

---

## 🛠️ Tech Stack

- React + TypeScript (class components)
- Vite
- Tailwind CSS
- ESLint v9 + Prettier
- Husky (pre-commit hook)
- Unsplash REST API

---

## ⚙️ Project Setup

### 1. Clone the repo

```bash
git clone git@github.com:NatashaSolntseva/react-rss.git
cd react-rss
```

### 2. Install dependencies

```
npm install
```

### 3. Set environment variables

Create a .env file in the root:

```
VITE_UNSPLASH_ACCESS_KEY=your_access_key_here
VITE_UNSPLASH_SECRET_KEY=your_secret_key_here
```

## 🧪 Available Commands

```bash
npm run dev         # Start dev server
npm run build       # Production build
npm run lint        # Run ESLint
npm run format      # Run Prettier
npm run format:fix  # Format and fix all files
```

## 🧯 Error Handling

- All runtime rendering errors are caught by an ErrorBoundary
- A special "Throw Error" button is available for testing error handling
